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
    const todos = await Todo.find({ owner: userId, parentId: null }).sort({createdAt:-1});
    res.status(200).json(todos);
  }catch(err){
    console.error('error');
    console.error(err.message);
    res.status(500).send('Error Occured, Try Again Later!');
  }
};

exports.updateTodo = async(req, res)=>{
  const todo = req.body
  try{
    const update = await Todo.findByIdAndUpdate(todo.id, todo, {new:true})
    res.status(200).send(update);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Data Not Saved!');
  }
}

exports.subTask = async(req, res)=>{
  const subTasks = req.body;
  const returnPayload = []
  try{
    for(subTask of subTasks){
      if(subTask._id){
        const updateSubTask = await Todo.findByIdAndUpdate(subTask._id, subTask, { new: true });
        returnPayload.push(updateSubTask._id)
      }else{
        const newTaskId = new Todo(subTask);
        const response = await newTaskId.save();
        returnPayload.push(response._id)

      }
    }
    res.status(200).json(returnPayload);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Data Not Saved!');
  }
}

exports.getSubTask = async(req, res)=>{
  const parentId = req.params.parentId;
  try{
    const todos = await Todo.find({parentId: parentId});
    console.log(todos)
    res.status(200).json(todos);
  }catch(err){
    console.error("err");
    console.error(err.message);
    res.status(500).send('Error Occured, Try Again Later!');
  }
}

exports.status = async(req, res)=>{
  const {taskId, status } = req.body
  try{
    const updateStatus = await Todo.findByIdAndUpdate(taskId, {
      $set:{status}
    }, {new:true})
    console.log(updateStatus)
    res.status(200).send(updateStatus)
  }catch(err){
    console.error("err");
    console.error(err.message);
    res.status(500).send('Error Occured, Try Again Later!');

  }
}
exports.removeSubTask = async(req, res)=>{
  const todoId = req.body
  try{
    res.status(200).send(await Todo.deleteOne({ _id: todoId }))
  }catch(err){
    console.log(err.message)
    res.status(500).send('Error Occured, Try Again Later!');
  }
}