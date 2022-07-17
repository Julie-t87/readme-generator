// packages needed for this application

const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
const writeFile = require('./utils/gen-readme.js');

// array of questions for user input

const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?(Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a project name');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'userGithub',
        message: 'Please enter your github username?(Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a valid username');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'userEmail',
        message: 'Please enter your email?(Required)'
        
    },
    {
        type: 'confirm',
        name: 'otherCont',
        message: 'Were there any other contributors?',
        default: false
    },
    {
        type: 'input',
        name: 'contNames',
        message: 'Please put other contributors names here:',
        when: ({ otherCont }) => {
            if (otherCont) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a description of project (not required but advised)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What do we need to do to install the project?(required)',
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter installation instructions');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: "please list any usage instructions"
    },
    {
        type: 'list',
        name: 'license',
        message: "What license does this fall under?",
        choices: ['None','Unlicense','MIT','Boost','Apache', 'Mozilla', 'GNU AGPLv3','GNU GPLv3', 'GNU LGPLv3'],
        default: 'None',
        validate: choiceMade => {
            if (choiceMade) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'features',
        message: "Did you want to include a list of features?",
        default: false
    },
    {
        type: "input",
        name: "featureList",
        message: 'Please enter your features:',
        when: ({ features }) => {
            if (features) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'contribute',
        message: "Did you want to include instructions for contribution?",
        default: false
    },
    {
        type: "input",
        name: "contributeList",
        message: 'Please enter your instructions for contribution:',
        when: ({ contribute }) => {
            if (contribute) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'yesTests',
        message: "Did you want to include a section for tests and examples?",
        default: false
    },
    {
        type: "input",
        name: "testList",
        message: 'Please enter your tests and examples:',
        when: ({ yesTests }) => {
            if (yesTests) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'yesQuestions',
        message: 'Did you want to provide additional instructions for questions?',
        default: false
    },
    {
        type: 'input',
        name: 'questionsList',
        message: "Please provide instructions for people who are looking to have questions answered",
        when: ({ yesQuestions }) => {
            if (yesQuestions) {
                return true;
            } else {
                return false;
            }
        }
    }
];


// initialize app

function init() {

    // help with answers to be formatted

    // runs so everything will load in order
    
    inquirer.prompt(questions)
    .then((markdownData) => {
        // generate README content
        return generateMarkdown(markdownData);
    })
    .then(markdownContent => {
        // write README file
        return writeFile(markdownContent);
    })
    .then(writeFileResponse => {
        // if successful
        console.log(writeFileResponse);
    })
    .catch(err => {
        // if a problem
        console.log(err);
    });
   
}

// call for initializing app
init();