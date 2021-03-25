const inquirer = require('inquirer');
const defaultConfig = require('../config.json');
const { cosmiconfigSync } = require('cosmiconfig');

function getConfig(
  directory,
  defaultConfigs = defaultConfig,
) {
  let packageConfig;
  if (directory) {
    packageConfig = getConfigFromDirectory(directory);
  }

  const actualConfig = getPackageConfig([defaultConfigs, packageConfig]);

  if (!actualConfig) {
    return undefined;
  }

  return actualConfig;
}

function getConfigFromDirectory(
  directory,
) {
  const packageConfigs = getAllConfigsFromDirectory(directory);

  if (!packageConfigs) {
    return undefined;
  }

  return packageConfigs;
}

function getAllConfigsFromDirectory(
  directory,
) {
  const configsLoader = cosmiconfigSync("reactbuildcomponent", {
    sync: true,
    packageProp: "reactBuildComponent",
    rcExtensions: true,
  });
  
  try {
    const configsResult = configsLoader.search(directory);
    if (!configsResult) {
      return undefined;
    }

    return configsResult.config;
  } catch (e) {
    // do nothing…
  }

  return undefined;
}

function getPackageConfig(
  rawConfigs,
) {
  const configs = rawConfigs.filter(rawConfig => !!rawConfig);

  if (configs.length === 0) {
    return undefined;
  }

  return configs.reduce((previousConfig, currentConfig) => {
    if (!currentConfig) {
      return previousConfig;
    }
    return currentConfig;
  });
}

module.exports = (template) => {
  let sortConfig;
    try {
        sortConfig = getConfig(process.cwd());
        if (!sortConfig) {
            console.log('error');
          return;
        }   
    } catch (error) {
        console.log('error', error);
    }

    const selectPath = [
      {
        type: 'rawlist',
        name: 'path',
        message: `Please select the path to save`,
        choices: Object.keys(sortConfig),
        default: 'path',
      },
    ];

    inquirer.prompt(selectPath).then(function (answers) {
      const config = {
        template,
        path: sortConfig[answers.path]
      }
      require('../lib/name')(config);
    });
};