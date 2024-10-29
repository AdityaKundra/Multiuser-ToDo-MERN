import {useState, useEffect} from 'react'
import axios from 'axios';
import AddTodoForm from './AddTodoForm';
import TaskList from './TaskList';
import Sidebar from './Sidebar';
import TaskDetailsModal from './TaskDetailsModal';

const Todos = () => {

  const [allTodos, setAllTodos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const handleNewData = (newData)=>{
    setAllTodos((prevState)=>[newData, ...prevState])
  }

  const openModal = (task) => {
    const fetchSubTask = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Make sure token exists before making the request
        if (!token) {
          throw new Error('No token found. User not authenticated.');
        }
    
        const subTasks = await axios.get(`http://localhost:5000/api/todo/subTask/${task._id}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
    
        if (subTasks.status === 200) {
          task.subTask = subTasks.data
        }
      } catch (error) {
        console.error('Error fetching sub-tasks:', error);
        // Handle errors like showing an alert or notifying the user
      }
    };
    fetchSubTask()
    setModalIsOpen(true);
    setModalData(task)
  };

  const closeModal = (e) => {
    setModalIsOpen(false);
    setModalData([]); 
  };

  useEffect(()=>{
    fetchAllTodos();
  },[])

  const fetchAllTodos = async(e)=>{
    const todoRequest = await axios.get('http://localhost:5000/api/todo/',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    // console.log(todoRequest);
      if(todoRequest.status === 200){
        setAllTodos(todoRequest.data);
      }
      // console.log(todoRequest.data);
  }

  return (
    <>
    <div className='flex'>
      <Sidebar/>
      <TaskList>
        {
          allTodos.map((task) => (              
              <div key={task._id} className="p-4 bg-white rounded shadow" onClick={()=>openModal(task)}>
                {/* <input type="checkbox" checked={task.status} /> */}
                <input type="checkbox" />
                <h3>{task.title}</h3>
                <div className='flex justify-between'>
                  <span className={`text-sm ${task.status !=='pending'? 'line-through' : ''}`}>{task.description}</span>
                  <span className="text-sm">{task.status}</span>
                </div>
              </div>
            ))
        }
      </TaskList>

    <AddTodoForm handleNewData = {handleNewData} />

      {/* TaskDetailsModal */}
      
      <TaskDetailsModal isOpen={modalIsOpen} onRequestClose={closeModal} modalData={modalData} />

    </div>
    </>
  )

}

export default Todos;