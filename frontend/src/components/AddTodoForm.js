import {useState} from 'react'
import axios from 'axios';

const AddTodoForm = ({handleNewData}) => {
   
    const [todoTitle, setTodotitle] = useState(''); 
    const [todoDesc, setTodoDesc] = useState('');
    const [todoStatus, setTodoStatus] = useState('pending');
    const [todoDueDate, setTodoDueDate] = useState('');

    const createTodo = async()=>{
        const newTodo = {title: todoTitle, description: todoDesc, status: todoStatus, dueDate: todoDueDate};
        const token = localStorage.getItem('token');
        const todoRequest = await axios.post('http://localhost:5000/api/todo/add', newTodo,{
          headers: {
            'Authorization': `Bearer ${token}`,
          } 
        });
        if(todoRequest.status === 200){
          setTodotitle('');
          setTodoDesc('');
          setTodoStatus('pending');
          setTodoDueDate('');
          handleNewData(todoRequest.data)
        }
      }
    
      const handleSubmit = (e)=>{
        e.preventDefault();
        // API call to create todo
        createTodo();
      }
  return (
    <div className="w-1/4 mx-2 p-6 bg-white rounded-lg shadow-md mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-center">Add Todo</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            required
            autoComplete="off"
            value={todoTitle}
            onChange={(e) => setTodotitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Description:</label>
          <input
            type="text"
            name="description"
            required
            autoComplete="off"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Status */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Status:</label>
          <select
            name="status"
            value={todoStatus}
            onChange={(e) => setTodoStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
  
        {/* Reminder */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Reminder:</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={todoDueDate}
            onChange={(e) => setTodoDueDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
  
}

export default AddTodoForm