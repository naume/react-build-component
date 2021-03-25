const inquirer = require('inquirer');
const selectName = [
  {
    type: 'input',
    name: 'name',
    message: `Please select the name`,
  },
];
module.exports = (config) => {
  inquirer.prompt(selectName).then(function (answers) {
    const fullConfig = {
      ...config,
      name: answers.name
    }
    switch (config.template) {
      case 'component':
        require('../scripts/createComponent')(fullConfig);
        break;
      case 'factory':
        require('../scripts/createFactory')(fullConfig);
        break;
      case 'hoc':
        require('../scripts/createHoc')(fullConfig);
        break;
  
      default:
        break;
    }
  });
};
