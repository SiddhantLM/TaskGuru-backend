const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleComplete,
} = require("../controller/todo");
const isAuth = require("../middlewares/isAuth");
router.post("/", isAuth, createTodo);
router.get("/", isAuth, getTodos);
router.put("/:id", isAuth, updateTodo);
router.put("/:id/toggle-complete", isAuth, toggleComplete);
router.delete("/:id", isAuth, deleteTodo);

module.exports = router;
