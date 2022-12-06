const { dirname } = require('path');
const fs = require('fs')
const fileName = 'todo_data.txt'

// getting the current local username
const userName = __dirname.split(/\\/g)[2];
let greetings = document.getElementById('greetings');

// display the greetings
greetings.innerHTML = `Hello ${userName}💫`

const addBtn = document.getElementById('addbtn')
const todos = document.getElementById('todos')
let todo = document.getElementById('todoinput')

function addEntry(todo_state, todo) {
    if (todo != '') {
        let deleteDiv = `<div class="delete" onclick="deleteTodo('${todo}')"></div>`
        let todoDiv = `<div class=${todo_state} onclick="toggleTodo('${todo}')">${todo} ${deleteDiv}</div>`
        todos.innerHTML = todos.innerHTML + todoDiv
    } else {
        console.log("Puduchuten")
    }
}

function loadtodoData() {
    todos.innerHTML = ''

    if (fs.existsSync(fileName)) {
        let data = fs.readFileSync(fileName, 'utf8').split('\n')
        console.log(data)
        if (data[0] == "" && data.length == 1) {
            console.log("Maybe")
        } else {
            data = data.slice(1)
            data.forEach((code, index) => {
                let [todoState, dump] = code.split(' - ')
                addEntry(todoState, dump)
            })
        }
    } else {
        console.log("No such file or directory")
        fs.writeFile(fileName, '', (err) => {
            if (err)    
                console.log(err)
        })
    }
}

function toggleTodo(todo) {
    let new_todo = []
    if (fs.existsSync(fileName)) {
        let data = fs.readFileSync(fileName, 'utf8').split('\n')
        
        data.forEach((code, index) => {
            let [state, dump] = code.split(' - ')
            if (dump == todo) {
                if (state == "done") {
                    state = "todo"
                } else {
                    state = "done"
                }
            }
            new_todo.push([state, dump + '\n'].join(" - "))
        })

        last_entry = new_todo.pop()
        new_todo.push(last_entry.replace('\n', ''))

    } else {
        console.log("No such file or directory")
        fs.writeFile(fileName, '', (err) => {
            if (err)    
                console.log(err)
        })
    }

    fs.writeFile(fileName, '', () => {
        todos.innerHTML = ''
    })
    let new_data = new_todo.join("")
    fs.writeFile(fileName, new_data, () => {
        loadtodoData()
    })
}

function deleteTodo(todoToDelete) {
    let new_todo = []
    if (fs.existsSync(fileName)) {
        let data = fs.readFileSync(fileName, 'utf8').split('\n')
        
        data.forEach((code, index) => {
            let [state, dump] = code.split(' - ')
            if (dump != todoToDelete) {
                new_todo.push([state, dump + '\n'].join(" - "))
            }
        })

        last_entry = new_todo.pop()
        last_entry = last_entry.replace('\n', '')
        new_todo.push(last_entry)

    } else {
        console.log("No such file or directory")
        fs.writeFile(fileName, '', (err) => {
            if (err)    
                console.log(err)
        })
    }

    fs.writeFile(fileName, '', () => {
        todos.innerHTML = ''
    })
    let new_data = new_todo.join("")
    fs.writeFile(fileName, new_data, () => {
        loadtodoData()
    })
}

loadtodoData()

addBtn.addEventListener('click', () => {
    let dump = todo.value
    if (dump !== '') {
        fs.appendFile(fileName, "\ntodo" + ' - ' + dump, () => {
            todo.value = ''
            loadtodoData()
        })
    } else {
        console.log("Dump in empty")
    }
})
