const express = require('express');
const router = express.Router();
const { removeTodo, addTodo, allTodos } = require('../controller/TodoController');
const cors = require('cors');

// Route

router.post('/add', addTodo);
router.post('/remove', removeTodo);
router.post('/', allTodos);

module.exports = router;
