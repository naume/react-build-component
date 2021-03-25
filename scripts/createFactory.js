// const glob = require('glob');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

const contentJsx = `import React from 'react';
import {
  ###COMPONENT###FactoryOptions,
  ###COMPONENT###FactoryOptionsStyles,
  ###COMPONENT###Props,
} from './typings';

type ###COMPONENT###PropsInner = ###COMPONENT###Props;

const defaultStyles: ###COMPONENT###FactoryOptionsStyles = {
  Wrapper: '',
  Content: '',
};

const ###FACTORY###Factory = ({ styles: appStyles }: ###COMPONENT###FactoryOptions) => {
  const ###COMPONENT### = (props: ###COMPONENT###PropsInner) => {

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          Hello ###COMPONENT###
        </div>
      </div>
    );
  };

  return ###COMPONENT###;
};

export default ###FACTORY###Factory;
`;

const typings = `export type ###COMPONENT###Props = {};

export type ###COMPONENT###FactoryOptionsStyles = {
  Wrapper: string;
  Content: string;
};

type GetStylesByProps<T> = (props: T) => ###COMPONENT###FactoryOptionsStyles;

export type ###COMPONENT###FactoryOptions<T = {}> = {
  styles: GetStylesByProps<T> | ###COMPONENT###FactoryOptionsStyles;
};`;

function handleWrite(err) {
  if (err) {
    console.log(chalk`{red File write failed!}`);
    process.exit(1);
    return;
  }
}

function createFactory(config) {
  const nameLowerCase =
    config.name.charAt(0).toLowerCase() + config.name.slice(1);
  const nameUpperCase =
    config.name.charAt(0).toUpperCase() + config.name.slice(1);
  const regex = /###COMPONENT###/gi;
  const factoryRegex = /###FACTORY###/gi;
  content = contentJsx
    .replace(regex, `${nameUpperCase}`)
    .replace(factoryRegex, `${nameLowerCase}`);
  typingContent = typings.replace(regex, `${nameUpperCase}`);

  fs.mkdir(path.join(config.path, `${nameUpperCase}`), (err) => {
    if (err) {
      return console.error(err);
    }
  });

  fs.writeFile(
    `${config.path}/${nameUpperCase}/factory.tsx`,
    content,
    handleWrite,
  );
  fs.writeFile(
    `${config.path}/${nameUpperCase}/typings.tsx`,
    typingContent,
    handleWrite,
  );
  console.log(
    chalk.green.bold(`Created ${nameUpperCase} factory successfully!`),
  );
  return;
}

module.exports = (config) => {
  if (!fs.existsSync(config.path)) {
    console.log(chalk.red.bold('Path not found!'), chalk.gray(config.path));
    process.exit(0);
  }

  createFactory(config);
};
