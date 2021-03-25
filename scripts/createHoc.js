// const glob = require('glob');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const contentJsx = `import React from 'react';

const ###HOC### = (WrappedComponent) => {
  const ###HOC###HoC = (props) => {
    console.log('hi from ', ###HOC###);
    return <WrappedComponent {...props} />;
  };
  return ###HOC###HoC;
};

export default ###HOC###;
`;

function handleWrite(err) {
  if (err) {
    console.log(chalk`{red File write failed!}`);
    process.exit(1);
    return;
  }
}

function createHoC(config) {
  const nameLowerCase =
    config.name.charAt(0).toLowerCase() + config.name.slice(1);
  const regex = /###HOC###/gi;
  content = contentJsx.replace(regex, `${nameLowerCase}`);
  console.log('xxx', nameLowerCase); // eslint-disable-line no-console
  fs.writeFile(
    `${config.path}/${nameLowerCase}.tsx`,
    content,
    handleWrite,
  );
  console.log(
    chalk.green.bold(`Created ${nameLowerCase} HoC successfully!`),
  );
  return;
}

module.exports = (config) => {
  if (!fs.existsSync(config.path)) {
    console.log(chalk.red.bold('Path not found!'), chalk.gray(config.path));
    process.exit(0);
  }

  createHoC(config);
};
