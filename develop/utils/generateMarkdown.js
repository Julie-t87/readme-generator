const generateLicense = require('./gen-license.js');

// returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    let licenseBadge = '';
    if (license !== 'None') {
     licenseBadge = `https://img.shields.io/badge/License-${license}-success`;
    } else {
     licenseBadge = `https://img.shields.io/badge/License-${license}-inactive`;
    }
    return licenseBadge;
}


// gets the returned license section and link for README
// If there is no license, return an empty string
function renderLicenseSection(license) {
    const [ licenseText, licenseLink ] = generateLicense(license);
    return `## License
Link: ${licenseLink}
License Terms:
${licenseText}
    `
}

// Check data entered in and form the contents and table of contents
// These get pushed to an array which is sent to the markdown text

function renderContents(sections) {
  const tocArr = [];
  const tocArrCont = [];
  if (sections.description) {
      tocArr.push('- [Description](#description)');
      tocArrCont.push('## Description\n\n' + sections.description + '\n');
  }
    tocArr.push('- [Contributors](#contributors)');
  if (sections.otherCont) {
    tocArrCont.push('## Contributors\n\n' + sections.userName + '\n' + sections.contNames + '\n');
  } else {
    tocArrCont.push('## Contributors\n\n' + sections.userName + '\n');
  }
  if (sections.features) {
    tocArr.push('- [Features](#features)');
    tocArrCont.push('## Features\n\n' + sections.featureList + '\n');
  }
  if (sections.contribute) {
    tocArr.push('- [Contribute](#contribute)');
    tocArrCont.push('## Contribute\n\n' + sections.contributeList + '\n');
  }
  if (sections.yesTests) {
    tocArr.push('- [Tests](#tests)');
    tocArrCont.push('## Tests\n\n' + sections.testList + '\n');
  }
  if (sections.installation) {
    tocArr.push('- [Installation](#installation)');
    tocArrCont.push('## Installation\n\n' + sections.installation + '\n');
  }
  if (sections.usage) {
    tocArr.push('- [Usage](#usage)');
    tocArrCont.push('## Usage\n\n' + sections.usage + '\n');
  }
  if (sections.yesQuestions){
      tocArr.push('- [Questions](#questions)')
      tocArrCont.push('## Questions\n\n' + sections.questionsList + '\n \n');
  }
  
  tocArr.push('- [Contact Information](#contact)');
  tocArr.push('- [License](#license)');
  tocArrCont.push('## Contact\n\n' + sections.userEmail + '\\n' + 'GitHub: ' + `https://github.com/${sections.userGithub}?tab=repositories`);
  
  // returns selected Table of Contents array and the selected segments content in an array that can be used to dynamically build the Markdown data

  return [tocArr.join("\r\n"), tocArrCont.join("\r\n").replace(/\\n/g, '\n' + '\n')];
}

// generate markdown for README
function generateMarkdown(data) {
    
    return `# ${data.projectName}
![${data.license} badge](${renderLicenseBadge(data.license)})
## Table of Contents
${renderContents(data)[0]}
${renderContents(data)[1]}
${renderLicenseSection(data.license)}
`;
}

module.exports = generateMarkdown;