const inquirer = require('inquirer');
const selectDotEnv = [
  {
    type: 'rawlist',
    name: 'template',
    message: `Please select the template`,
    choices: [
      'component',
      'factory',
      'hoc',
    ],
    default: 'component',
  },
];
module.exports = () => {
  inquirer.prompt(selectDotEnv).then(function (answers) {
    require('../lib/path')(answers.template);
  });
};
