const inquirer = require('inquirer')
const fs = require('fs')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
const teamTemplate = require('./util/generateHtml')

const team = []

async function promptQuestions() {
    let hasMoreEmployees = true
    while (hasMoreEmployees) {
        const answers = await inquirer
            .prompt([
                {
                    type: 'list',
                    choices: ['Manager', 'Engineer', 'Intern'],
                    message: `What type of employee do you want to add?`,
                    name: 'type',
                },
                {
                    type: 'input',
                    message: `Name of employee`,
                    name: 'name',
                },
                {
                    type: 'input',
                    message: `Employee ID number`,
                    name: 'id',
                },
                {
                    type: 'input',
                    message: `Employee email`,
                    name: 'email',
                },
                {
                    type: 'input',
                    message: (answers) => {
                        if (answers.type === 'Manager') return 'Office number'
                        if (answers.type === 'Engineer') return 'Github username'
                        if (answers.type === 'Intern') return 'School name'
                    },
                    name: 'additionalQuestion',
                },
                {
                    type: 'confirm',
                    message: `Do you want to add another employee?`,
                    name: 'addEmployee',
                },
            ])
        addEmployee(answers)
        if (!answers.addEmployee) hasMoreEmployees = false
    }
    const generatedTemplete = teamTemplate(team)
    createHtml(generatedTemplete)
}

function addEmployee(employee) {
    if (employee.type === 'Manager') {
        const manager = new Manager(employee.name, employee.id, employee.email, employee.additionalQuestion)
        team.push(manager)
    } else if (employee.type === 'Engineer') {
        const engineer = new Engineer(employee.name, employee.id, employee.email, employee.additionalQuestion)
        team.push(engineer)
    } else if (employee.employeeType === 'Intern') {
        const intern = new Intern(employee.name, employee.id, employee.email, employee.additionalQuestion)
        team.push(intern)
    }
}

function createHtml(template) {
    fs.writeFile('./dist/index.html', template, err => {
        if (err) {
            console.error(err);
        }
    })
}



promptQuestions()