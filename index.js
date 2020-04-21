const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your Project Title?"
    },
    {
      type: "input",
      name: "Description",
      message: "Please describe your project briefly."
    },
    {
      type: "checkbox",
      message: "Select the contents of your Table of Contents",
      name: "tableOfContents",
      choices: [
          "Project Title",
          "Description",
          "Installation",
          "Usage",
          "License",
          "Contributing",
          "Tests",
          "Questions"
        ]
    },
    {
      type: "list",
      name: "License",
      message: "What is your License Method?",
      choices: ['MIT','Json','Javascript'],

    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    },
    {
      type: "input",
      name: "Question",
      message: "Please enter the question so far."
    },
  ]);
}

function generateMD(answers) {
  return `
# ReadMe Generator

## Project Title

${answers.Name}

## Descritption

${answers.Description}

## Questions

${answers.Question}

## License

${answers.License}

## Table of Contents

 * Project Title
 * Description
 * Installation
 * Usage
 * License
 * Contributing
 * Tests
 * Questions

## GitHub Account

${answers.github}`;
}

promptUser()
  .then(function(answers) {
    const html = generateMD(answers);

    return writeFileAsync("README.md", html);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });
