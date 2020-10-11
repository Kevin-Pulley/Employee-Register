const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("../lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");

const teamChoices = [];


function renderPage(){
    fs.writeFileSync(outputPath, render(teamChoices), "utf8") 
}

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "teamChoices",
            message: "What position is being filled?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "None/Quit"
            ]
        }]).then(userChoices => {
            switch (userChoices.teamChoices) {
                case "Manager":
                    addManager();
                    break;

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                default: renderPage();

            }
        })
}

function addManager() {
    inquirer.prompt([
        {
            type: "list",
            name: "managerName",
            message: "What is your name?"

        },
        {
            type: "list",
            name: "managerId",
            message: "Enter Employee ID"

        },
        {
            type: "list",
            name: "managerEmail",
            message: "Enter your email address:"

        },
        {
            type: "list",
            name: "managerOfficeNumber",
            message: "Enter your office number:"

        },

    ]).then(response => {
        const Manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber)
        teamChoices.push(Manager);
        createTeam()
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "list",
            name: "internName",
            message: "What is your name?"

        },
        {
            type: "list",
            name: "internId",
            message: "Enter Employee ID"

        },
        {
            type: "list",
            name: "internEmail",
            message: "Enter your email address:"

        },
        {
            type: "list",
            name: "internSchool",
            message: "What school do you attend?"

        },

    ]).then(response => {
        const Intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool)
        teamChoices.push(Intern);
        createTeam()
    })
}


function addEngineer() {
    inquirer.prompt([
        {
            type: "list",
            name: "engineerName",
            message: "What is your name?"

        },
        {
            type: "list",
            name: "engineerId",
            message: "Enter Employee ID"

        },
        {
            type: "list",
            name: "engineerEmail",
            message: "Enter your email address:"

        },
        {
            type: "list",
            name: "engineerGithub",
            message: "Enter your Github username"

        },

    ]).then(response => {
        const Engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerSchool)
        teamChoices.push(engineer);
        createTeam()
    })
}
renderPage()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```