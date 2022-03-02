const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let todos = [
  {
    id: 1,
    title: "Update the ceo",
  },
  {
    id: 2,
    title: "Create a group meeting call",
  },
];

app.get("/api/todos", (req, res) => {
  res.status(200).json(todos);
});

app.post("/api/todos", (req, res) => {
  let { title } = req.body;
  let todosSize = todos.length + 1;
  let NewTodo = {
    id: todosSize,
    title,
  };
  todos.push(NewTodo);
  res.status(200).json(NewTodo);
});

app.patch("/api/todos/:id", (req, res) => {
  let todoId = +req.params.id;
  let updatedTodo = req.body;
  let todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos[todoIndex] = updatedTodo;
  }
  res.status(200).json(todos);
});

app.delete("/api/todos/:id", (req, res) => {
  let todoId = +req.params.id;
  let todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos = todos.filter((todo) => todo.id !== todoId);
  }

  res.status(200).json(todos);
});

let PORT = 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
