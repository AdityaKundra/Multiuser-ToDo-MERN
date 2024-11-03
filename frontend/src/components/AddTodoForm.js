import { useState } from 'react';
import axios from 'axios';

const AddTodoForm = ({ handleNewData }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [todoStatus, setTodoStatus] = useState('pending');
  const [todoDueDate, setTodoDueDate] = useState('');

  const createTodo = async () => {
    const newTodo = { title: todoTitle, description: todoDesc, status: todoStatus, dueDate: todoDueDate };
    const token = localStorage.getItem('token');

    try {
      const todoRequest = await axios.post('http://localhost:5001/api/todo/add', newTodo, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (todoRequest.status === 200) {
        setTodoTitle('');
        setTodoDesc('');
        setTodoStatus('pending');
        setTodoDueDate('');
        handleNewData(todoRequest.data);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo();
  };

  return (
    <div className="w-1/4 mx-2 p-6 bg-white rounded-lg shadow-md mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-center">Add Todo</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Title:</label>
          <input
            type="text"
            required
            autoComplete="off"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Description:</label>
          <input
            type="text"
            required
            autoComplete="off"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Status:</label>
          <select
            value={todoStatus}
            onChange={(e) => setTodoStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Reminder:</label>
          <input
            type="datetime-local"
            value={todoDueDate}
            onChange={(e) => setTodoDueDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
