// const glob = require('glob');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const contentJsx = `import React, { ReactElement } from 'react';
import { ###COMPONENT###Props } from './typings';

const ###COMPONENT### = ({ ...props }: ###COMPONENT###Props): ReactElement => {
  console.log('###COMPONENT###', props);
  return (
    <>
      Hello ###COMPONENT###
    </>
  );
};

export default ###COMPONENT###;
`;
const typings = `export type ###COMPONENT###Props = {};`;

function handleWrite(err) {
  if (err) {
    console.log(chalk`{red File write failed!}`);
    process.exit(1);
    return;
  }
}

function createComponent(config) {
  const nameCapitalized = config.name.charAt(0).toUpperCase() + config.name.slice(1);
  const regex = /###COMPONENT###/gi;
  content = contentJsx.replace(regex, `${nameCapitalized}`);
  typingContent = typings.replace(regex, `${nameCapitalized}`);

  fs.mkdir(path.join(config.path, `${nameCapitalized}`), (err) => {
    if (err) {
      return console.error(err);
    }
  });

  fs.writeFile(
    `${config.path}/${nameCapitalized}/index.tsx`,
    content,
    handleWrite,
  );
  fs.writeFile(
    `${config.path}/${nameCapitalized}/typings.tsx`,
    typingContent,
    handleWrite,
  );
  console.log(
    chalk.green.bold(`Created ${nameCapitalized} component successfully!`),
  );
  return;
}

module.exports = (config) => {
  if (!fs.existsSync(config.path)) {
    console.log(chalk.red.bold('Path not found!'), chalk.gray(config.path));
    process.exit(0);
  }

  createComponent(config);
};
