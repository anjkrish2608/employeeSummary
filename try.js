const inquirer = require("inquirer");

inquirer.registerPrompt("recursive", require("inquirer-recursive"));

var employeeQ = [
    {
        type: "input",
        name: "name",
        message: "what is ur name?",
        validate: function (value) {
            if ((/.+/).test(value)) { return true; }
            return 'name is required';
        }

    },
    {
        type: "input",
        name: "age",
        message: "what is ur age?",
        validate: function (value) {
            var digitsOnly = /\d+/;
            if (digitsOnly.test(value)) { return true; }
            return 'Invalid age! Must be a number genius!';
        }
    }
]

inquirer.prompt(employeeQ).then(function (answers) {
        console.log(answers);
        console.log(answers.users);
    }).catch(function (err) {
        console.log(err);
    });

function init(){

}

init();


//initialize -> Ask Manager questions + Create Manager + Save manager + createTeam()
    //createTeam() -> Asks what kind o femploye
        //if engineer -> creteEngineer()
            // Asks Engineer questions + create + save
            // createTeam()
        //if engineer -> creteEngineer()
            // Asks Engineer questions + create + save
            // createTeam()
        //default -> exit
