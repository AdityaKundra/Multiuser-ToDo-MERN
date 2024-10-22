const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  },
  dueDate: { 
    type: Date 
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  subTask:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Todo'
  }
}, {
  timestamps: true
});
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
