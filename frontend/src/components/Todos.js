import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AddTodoForm from './AddTodoForm';
import TaskList from './TaskList';
import Sidebar from './Sidebar';
import TaskDetailsModal from './TaskDetailsModal';

const Todos = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const token = localStorage.getItem('token');

  const handleNewData = (newData) => {
    setAllTodos((prevState) => [newData, ...prevState]);
  };

  const openModal = async (task) => {
    try {
      if (!token) throw new Error('No token found. User not authenticated.');

      const subTasks = await axios.get(`http://localhost:5001/api/todo/subTask/${task._id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (subTasks.status === 200) {
        task.subTask = subTasks.data;
      }
    } catch (error) {
      console.error('Error fetching sub-tasks:', error);
    }

    setModalData(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalData([]);
  };

  const fetchAllTodos = useCallback(async () => {
    try {
      const todoRequest = await axios.get('http://localhost:5001/api/todo/', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (todoRequest.status === 200) {
        setAllTodos(todoRequest.data);
        setFilteredTodos(todoRequest.data); // Set filtered todos initially
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchAllTodos();
  }, [fetchAllTodos]);

  useEffect(() => {
    let filtered = allTodos;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date filter and filter type
    const today = new Date().toDateString(); // Get today's date as a string

    if (filterType === 'today') {
      filtered = filtered.filter(todo => new Date(todo.dueDate).toDateString() === today);
    } else if (filterType === 'upcoming') {
      filtered = filtered.filter(todo => new Date(todo.dueDate) > new Date());
    } else if (filterType === 'past') {
      filtered = filtered.filter(todo => new Date(todo.dueDate) < new Date());
    }

    setFilteredTodos(filtered);
  }, [filterType, allTodos, searchTerm]); // Include searchTerm in dependencies

  const handleStatus = async (obj) => {
    try {
      const updateStatus = await axios.post('http://localhost:5001/api/todo/status', obj, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (updateStatus.status === 200) {
        fetchAllTodos(); // Fetch todos again after updating status
        console.log(`Status Updated`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex pt-16">
      <Sidebar
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        filterType={filterType}
        setFilterType={setFilterType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} // Pass search term and setter to Sidebar
      />

      <div className="w-2/4">
        <TaskList>
          {filteredTodos.map((task) => (
            <div key={task._id} className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300">
              <input
                type="checkbox"
                checked={task?.status === 'completed'}
                onChange={(e) => {
                  const newStatus = e.target.checked ? 'completed' : 'pending';
                  handleStatus({ taskId: task?._id, status: newStatus });
                }}
              />
              <div onClick={() => openModal(task)}>
                <h3 className="font-bold">{task.title}</h3>
                <div className="flex justify-between">
                  <span className={`text-sm ${task.status !== 'pending' ? 'line-through text-gray-400' : ''}`}>
                    {task.description}
                  </span>
                  <span className="text-sm">{task.status}</span>
                </div>
                <div>
                  Due Date: {
                    new Date(task.dueDate).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }
                </div>
              </div>
            </div>
          ))}

        </TaskList>
      </div>

      <AddTodoForm handleNewData={handleNewData} />
      <TaskDetailsModal isOpen={modalIsOpen} onRequestClose={closeModal} modalData={modalData} refreshTodo={fetchAllTodos} />
    </div>
  );
};

export default Todos;
