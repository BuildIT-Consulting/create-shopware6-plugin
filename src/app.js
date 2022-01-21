#!/usr/bin/env node

const commandLineArgs = require('command-line-args')
const fs = require('fs');
const path = require('path');
const cwd = process.cwd()

const optionDefinitions = [{
        name: 'name',
        alias: 'n',
        type: String,
        defaultOption: true
    },
    {
        name: 'technical',
        alias: 't',
        type: String
    },
    {
        name: "dockware",
        alias: "d",
        type: Boolean
    },
    {
        name: "targetVersion",
        type: String,
        defaultValue: "latest"
    }, {
        name: "minVersion",
        type: String,
        defaultValue: "6.3.5.0"
    }
]

async function init() {
    try {
        const options = commandLineArgs(optionDefinitions)
        console.info(`Creating plugin: ${options.name}`);
        console.info(`Target version: ${options.targetVersion}`);

        const root = createPluginFolder(options.name);
        const pluginRoot = path.join(__dirname, "../");   

        const composerTemplate = fs.readFileSync(path.join(pluginRoot, 'templates/composer.json.template'));
        const templateVariables = {
            name: options.name,
            name_lower: options.technical ?? options.name.toLowerCase(),
            min_version: options.minVersion,
            version: options.targetVersion
        }
        fs.writeFileSync(path.join(root, 'src/composer.json'), compileTemplate(composerTemplate.toString(), templateVariables), { flag: 'a+' });
        if(options.dockware){
            const dockerTemplate = fs.readFileSync(path.join(pluginRoot, 'templates/docker-compose.yml.template'));
            fs.writeFileSync(path.join(root, 'docker-compose.yml'), compileTemplate(dockerTemplate.toString(), templateVariables), { flag: 'a+' });
        }

        const PluginTemplate = fs.readFileSync(path.join(pluginRoot, 'templates/plugin.php.template'));
        fs.writeFileSync(path.join(root, `src/src/${options.name}.php`), compileTemplate(PluginTemplate.toString(), templateVariables), { flag: 'a+' });

    } catch (e) {
        console.error(e.message)
    }
}

function createPluginFolder(folderName) {
    const root = path.join(cwd, folderName)
    const structure = `${root}/src/src`;
    if (!fs.existsSync(structure)) {
        fs.mkdirSync(structure, {
            recursive: true
        });
    }
    return root;
}

function compileTemplate(template, properties) {
    var returnValue = "";

    var templateFragments = template.split("{{");

    returnValue += templateFragments[0];

    for (var i = 1; i < templateFragments.length; i++) {
        var fragmentSections = templateFragments[i].split("}}", 2);
        returnValue += properties[fragmentSections[0]];
        returnValue += fragmentSections[1];
    }

    return returnValue;
}

init().catch((e) => {
    console.error(e)
})