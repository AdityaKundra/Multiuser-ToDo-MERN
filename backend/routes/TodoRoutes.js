const express = require('express');
const router = express.Router();
const { removeTodo, addTodo, allTodos, updateTodo, subTask, getSubTask, status, removeSubTask } = require('../controller/TodoController');
const cors = require('cors');

// Route

router.get('/', allTodos);
router.post('/add', addTodo);
router.post('/remove', removeTodo);
router.post('/update', updateTodo);
router.post('/subTask', subTask);
router.post('/removeTask', removeSubTask);
router.post('/status', status);
router.get('/subTask/:parentId', getSubTask);

module.exports = router;
