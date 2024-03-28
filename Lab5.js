const assignment = {
    id: 1, 
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", 
    completed: false, 
    score: 0, 
}
const module ={
    id: 12345,
    name: "NodeJS",
    description: "NodeJS is a JavaScript runtime built on Chrome's V8 JavaScript engine",
    course: "CS5610",
}
const todos = [
    {id: 1, title: "Learn HTML", completed: true},
    {id: 2, title: "Learn CSS", completed: true},
    {id: 3, title: "Learn JavaScript", completed: true},
    {id: 4, title: "Learn NodeJS", completed: false},
    {id: 5, title: "Learn ExpressJS", completed: false},
    {id: 6, title: "Learn ReactJS", completed: false},
]

export default function Lab5(app){
    const lab5 = (req, res) => {
        res.send("Welcome to Lab 5!");
    };

    app.get("/a5/add/:num1/:num2", (req, res) => {
        const num1 = parseInt(req.params.num1);
        const num2 = parseInt(req.params.num2);
        const sum = num1 + num2;
        res.send(`${num1} + ${num2} = ${sum}`);
    });
    app.get("/a5/subtract/:num1/:num2", (req, res) => {
        const {num1, num2} = req.params;
        const difference = num1 - num2;
        res.send(`${num1} - ${num2} = ${difference}`);
    });
    app.get("/a5/multiply/:num1/:num2", (req, res) => {
        const {num1, num2 }= req.params;
        const product = num1 * num2;
        res.send(`${num1} * ${num2} = ${product}`);
    });
    app.get("/a5/divide/:num1/:num2", (req, res) => {
        const {num1, num2} = req.params;
        const quotient = num1 / num2;
        res.send(`${num1} / ${num2} = ${quotient}`);
    });
    app.get("/a5/welcome", lab5);
    app.get("/a5/calculator", (req, res) => {
        const query = req.query;
        const a = parseInt(query.a);
        const b = parseInt(query.b);
        const operation = query.operation;
        switch(operation){
            case "add":
                res.send(`${a} + ${b} = ${a+b}`);
                break;
            case "subtract":
                res.send(`${a} - ${b} = ${a-b}`);
                break;
            case "multiply":
                res.send(`${a} * ${b} = ${a*b}`);
                break;
            case "divide":
                res.send(`${a} / ${b} = ${a/b}`);
                break;
            default:
                res.send("Invalid operation");
        }
        res.send(query);
    });
    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/a5/assignment/title/:title", (req, res) => {
        const newTitle = req.params.title;
        assignment.title = newTitle;
        res.send(assignment);
    });
    app.get("/a5/assignment/completed/:completed", (req, res) => {
        const newCompleted = req.params.completed;
        assignment.completed = newCompleted;
        res.send(assignment);
    });
    app.get("/a5/assignment/score/:score", (req, res) => {
        const newScore = req.params.score;
        assignment.score = newScore;
        res.send(assignment);
    });
    app.get("/a5/assignment/description/:description", (req, res) => {
        const newDescription = req.params.description;
        assignment.description = newDescription;
        res.send(assignment);
    });
    app.get("/a5/module", (req, res) => {
        res.send(module);
    });
    app.get("/a5/module/name", (req, res) => {
        res.send(module.name);
    });
    app.get("/a5/module/name/:newName", (req, res) => {
        const newName = req.params.newName;
        module.name = newName;
        res.send(module);
    });
    // app.get("/a5/todos", (req, res) => {
    //     res.send(todos);//or res.json(todos);
    // });
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
          ...req.body,
          id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
      });
    
    app.get("/a5/todos/completed", (req, res) => { // should be put prior to the other `/a5/todos/:id` route to avoid that no other route is intercepting or overshadowing this specific route
        const completedTodos = todos.filter(todo => todo.completed);
        res.json(completedTodos);
    });
    app.get("/a5/todos/create", (req, res) => {
        const newTodo = {
          id: new Date().getTime(),
          title: "New Task",
          completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
      }); 
      app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404)
              .json({ message: `Unable to update Todo with ID ${id}` });
            return;
            }
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
      });
       
    app.get("/a5/todos/:id", (req, res) => {
        const {id} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        res.send(todo); //or res.json(todo);
    });
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
          const completedBool = completed === "true";
          const completedTodos = todos.filter(
            (t) => t.completed === completedBool);
          res.json(completedTodos);
          return;
        }
        res.json(todos);
      });
    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if(!todo) {
            res.sendStatus(404).json({message: `Unable to delete Todo with ${id}`});
            return;
        }
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    });
    
    app.get("/a5/todos/:id/delete", (req, res) => {
        const {id} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        const todoIndex = todos.indexOf(todo);
        if (todoIndex !== -1) {
          todos.splice(todoIndex, 1);
        }
        res.json(todos);
      });
    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const {id, title} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        todo.title = title;
        res.json(todos);
      });
    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const {id, completed} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        todo.completed = completed === "true";
        res.json(todos);
    });
    app.get("/a5/todos/:id/description/:description", (req, res) => {
        const {id, description} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        todo.description = description;
        res.json(todos);
    });
        
}