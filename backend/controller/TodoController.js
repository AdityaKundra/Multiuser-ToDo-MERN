const Todo = require('../model/TodoModel');

exports.addTodo = async (req, res) => {
  const { title, description, status, dueDate} = req.body;
  console.log(req.body);

  try {
    console.log(`it's working!!!`);
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.removeTodo = async (req, res) => {
 console.log(`its working!!!`);
};


exports.allTodos =  async (req, res) => {
  console.log(`listing all todos...`);
};
