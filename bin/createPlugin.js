#!/usr/bin/env node
'use strict';

const commandLineArgs = require('command-line-args');
const axios = require('axios');
const parser = require('xml2json');
require('fs');

const optionDefinitions = [{
        name: 'name',
        alias: 'n',
        type: String
    },
    {
        name: 'version',
        type: String
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
];

async function init() {
    try {
        const options = commandLineArgs(optionDefinitions);
        let targetVersion = options.targetVersion;
        if (options.targetVersion === 'latest') {
            targetVersion = await getLatestVersion();
        }
        console.info(`Creating plugin: ${options.name}`);
        console.info(`Target version: ${targetVersion}`);
        getLatestVersion();
    } catch (e) {
        console.error(e.message);
    }
}

async function getLatestVersion() {
    const rssFeed = await axios.get("https://www.shopware.com/de/changelog/?sRss=1");
    const json = JSON.parse(parser.toJson(rssFeed.data));
    return json.rss.channel.item[0].title;
}

init().catch((e) => {
    console.error(e);
});
