const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const Choices = require("inquirer/lib/objects/choices");
let employeeCount=0;

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer.prompt([
    {
        name: "name",
        message:"What is the team member's name?",
        type:"input"
    },
    {
        name: "id",
        message:"What is the team member's ID?",
        type:"input"
    },
    {
        name: "email",
        message:"What is the team member's email?",
        type:"input"
    },{
        name:"type",
        message:"Select the type of employee:",
        type:"list",
        choices: ["Engineer","Intern","Manager"]
    }
]).then(function(response){

    new Employee(response.name,response.id,response.email);
    switch(response.type){
        case "Engineer":
            inquirer.prompt([
                {
                    name: "github",
                    message:"What is the engineer's github account?",
                    type:"input" 
                }
            ]).then(function(response2){
                const final={...response,...response2};
                new Engineer(final.name,final.id,final.email,final.github);
            });
        break;
        case "Intern":
            inquirer.prompt([
                {
                    name: "school",
                    message:"What is the name of the Intern's school?",
                    type:"input" 
                }
            ]).then(function(response2){
                const final={...response,...response2};
                new Intern(final.name,final.id,final.email,final.school);
            });
        break;
        case "Manager":
            inquirer.prompt([
                {
                    name: "officeNumber",
                    message:"What is the Manager's office number?",
                    type:"number" 
                }
            ]).then(function(response2){
                const final={...response,...response2};
                new Manager(final.name,final.id,final.email,final.officeNumber);
            });
        break;
    }

});
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