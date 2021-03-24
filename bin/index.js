#!/usr/bin/env node

const program = require('commander');
const version = require('../lib/version');
program
  .usage('[options] <file>')
  .option('-v, --version', 'show version', version, '')
  .option('-p, --port <port>', 'use custom port')
  .option('-f, --flag', 'boolean flag', false)
  .option('-p, --app [app]', 'App [string]', null).parse(process.argv)
  .action((file, options) => {
    require('../lib/template')();
  })
  .parse(process.argv);