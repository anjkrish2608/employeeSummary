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
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// inquirer.registerPrompt("recursive",require("inquirer-recursive"));

//questions
const employeeQ =[
    {
        name: "name",
        message: "What is the team member's name?",
        type: "input"
    },
    {
        name: "id",
        message: "What is the team member's ID?",
        type: "input"
    }
    ,
    {
        name: "email",
        message: "What is the team member's email?",
        type: "input"
    }
];
const typeOfEmployeeQ=[{
    name: "type",
    message: "Select the type of employee:",
    type: "list",
    choices: ["Engineer", "Intern", "End of team"]
}];
const managerQ= [{
    name: "name",
    message: "What is the Manager's name?",
    type: "input"
},
{
    name: "id",
    message: "What is the Manager's ID?",
    type: "input"
}
,
{
    name: "email",
    message: "What is the Manager's email?",
    type: "input"
},
{
    name: "officeNumber",
    message: "What is the Manager's office number?",
    type: "number"
}];
const engineerQ=[{
                    name: "github",
                    message: "What is the engineer's github account?",
                    type: "input"
                }];
const internQ=[{
    name: "school",
    message: "What is the name of the Intern's school?",
    type: "input"
}];
let employeeArr =[];
//initial function to ask manager details
var init = () =>{
    inquirer.prompt(managerQ).then(function ({name,id,email,officeNumber}) {
        const manager = new Manager(name,id,email,officeNumber);
        employeeArr.push(manager);
        createTeam();
    });

}

const createTeam=()=>{
    
        inquirer.prompt(typeOfEmployeeQ).then(function({type}){
            
            if(type==="Intern"){
                inquirer.prompt(employeeQ).then(function(ans){
                createIntern(ans);
            });
            }
            else if(type==="Engineer"){
                inquirer.prompt(employeeQ).then(function(ans){
                createEngineer(ans);
            });
            }
            else{
                renderTime();
            }
        });
    
}

const createIntern=(data)=>{
    inquirer.prompt(internQ).then(function({school}){
        const intern =new Intern(data.name,data.id,data.email,school);
        employeeArr.push(intern);
        createTeam();
    });
}


const createEngineer=(data)=>{
    inquirer.prompt(engineerQ).then(function({github}){
        const engineer =new Engineer(data.name,data.id,data.email,github);
        employeeArr.push(engineer);
        createTeam();
    });
}

const renderTime=()=>{
    
    fs.writeFile(outputPath, render(employeeArr),"utf8", function(err) {

        if (err) {
          return console.log(err);
        }
      
        
      
      });
          
}
init();

    

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

