const { json } = require('body-parser');
const Todo = require('../model/TodoModel');

exports.addTodo = async (req, res) => {
  const { title, description, status, dueDate} = req.body;
  const owner = req.decode?.user?.id;
  try {
    const todoData =new Todo({title, description, status, dueDate,owner});
    const response = await todoData.save();
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Data Not Saved!');
  }
};

exports.removeTodo = async (req, res) => {
 console.log(`its working!!!`);
};


exports.allTodos =  async (req, res) => {
  const userId = req.decode?.user?.id;
  try{
    const todos = await Todo.find({owner:userId});
    res.status(200).json(todos);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Data Not Saved!');
  }
};