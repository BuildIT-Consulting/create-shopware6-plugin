
# Shopware 6 Plugin Generator

  

This small npm package is used to create a new Shopware 6 Plugin

  

## Usage

  

    npx create-shopware6-plugin --name "PluginName" --technical "plugin_name" --dockware --targetVersion "latest" --minVersion "6.3.5.0"

  

## Options

    --name

Plugin Name: used for BaseClass and folder name

    --technical

Technical name: Technical name (see [Shopware Documentation](https://developer.shopware.com/docs/guides/plugins/plugins/plugin-base-guide#name-your-plugin) for more Information)

    --dockware (optional)

Should [Dockware](https://dockware.io/) be setup with docker compose?

    --targetVersion (optional)

Only if dockware, which Shopware version should be used for setting up dockware

    --minVersion

minimum version of shopware (see [Shopware Documentation](https://developer.shopware.com/docs/guides/plugins/plugins/plugin-base-guide#name-your-plugin) for more Information)
