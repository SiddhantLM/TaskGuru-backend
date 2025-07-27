const Todo = require("../model/todo");
const User = require("../model/user");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const existingTodo = await Todo.findOne({ title });
    if (existingTodo) {
      return res.status(400).json({ message: "Todo already exists" });
    }

    const todo = new Todo({ title, description, userId: req.user.userId });

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.todos.push(todo._id);
    await user.save();
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.userId).populate("todos");
    console.log(user.todos);
    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    todo.title = title;
    todo.description = description;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.todos = user.todos.filter((todo) => todo.toString() !== id);
    await user.save();
    await todo.deleteOne();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleComplete = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleComplete,
};
