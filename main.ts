
import inquirer from "inquirer";
import chalk from "chalk"; 

let todolist: string[] = [];
let conditions = true ;

console.log(chalk.italic.yellow("\n\t Hey! Wellcome to My Todo-list Application \n"));

let main = async () =>  {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                choices: ["Add Task", "Update Task", "View Task", "Delete Task", "Exit"],
            }
        ])
        if(option.choices === "Add Task") {
            await addtask()
        }

        else if (option.choices === "View Task") {
            await viewTask()
        }

        else if (option.choices === "Delete Task") {
            await deletetask()
        }

        else if (option.choices === "Exit") {
            conditions = false;
        }

        if (option.choices === "Update Task") {
            let updateTask = await inquirer.prompt([
                {
                    name: "todo",
                    type: "list",
                    message: "Updated Task",
                    choices: todolist.map(update => update),
                }
            ])
    
            let newTask = await inquirer.prompt([
                {
                    name: "task",
                    type: "input",
                    message:chalk.bgGray("Enter your new Task"),
                }
            ])
            let newtodo = todolist.filter(value => value !== updateTask.todo);
            todolist = [...newtodo,newTask.task];
            console.log(todolist);
        }
    
    }
}

    let addtask = async () => {
        let newTask = await inquirer.prompt([
            {
                name: "task",
                type: "input",
                message: "Enter your new Task",
            }
        ])
        todolist.push(newTask.task);
        console.log(`\n ${newTask.task} task added in todo-list \n`);
    };

    let viewTask = () => {
        console.log("Your todo list");
        todolist.forEach((task, index) => {
            console.log(`${index}: ${task}`);
            
        })
    }    

    let deletetask = async () => {
        await viewTask()

        let taskIndex = await inquirer.prompt ([
            {
                name: "index",
                type: "number",
                message: "Enter the 'index no' of the task you want to delete",
            }
        ]);
        let deletedTask = todolist.splice(taskIndex.index, 1);
        console.log(`${deletedTask} This task has been deleted`);
        
    }
  main();
    