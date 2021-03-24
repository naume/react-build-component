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

function createComponent(name) {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  const regex = /###COMPONENT###/gi;
  content = contentJsx.replace(regex, `${nameCapitalized}`);
  typingContent = typings.replace(regex, `${nameCapitalized}`);

  fs.mkdir(path.join('src/beobachter', `${nameCapitalized}`), (err) => {
    if (err) {
      return console.error(err);
    }
  });

  fs.writeFile(
    `src/beobachter/${nameCapitalized}/index.tsx`,
    content,
    handleWrite,
  );
  fs.writeFile(
    `src/beobachter/${nameCapitalized}/typings.tsx`,
    typingContent,
    handleWrite,
  );
  console.log(
    chalk.green.bold(`Created ${nameCapitalized} component successfully!`),
  );
  return;
}

module.exports = (config) => {
  if (!fs.existsSync(`src/beobachter`)) {
    console.log(chalk.red.bold('App not found!'));
    process.exit(0);
  }

  createComponent(config.name);
};
