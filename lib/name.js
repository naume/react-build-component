const inquirer = require('inquirer');
const selectName = [
  {
    type: 'input',
    name: 'name',
    message: `Please select the name`,
  },
];
module.exports = (template) => {
  inquirer.prompt(selectName).then(function (answers) {
    const config = {
      template: template,
      name: answers.name
    }
    switch (config.template) {
      case 'component':
        require('../scripts/createComponent')(config);
        break;
  
      default:
        break;
    }
  });
};
