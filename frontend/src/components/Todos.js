import {useState, useEffect} from 'react'
import axios from 'axios';
import AddTodoForm from './AddTodoForm';
import TaskList from './TaskList';
import Sidebar from './Sidebar';
import TaskDetailsModal from './TaskDetailsModal';

const Todos = () => {

  const [allTodos, setAllTodos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
              <div key={task._id} className="p-4 bg-white rounded shadow" onClick={openModal}>
                {/* <input type="checkbox" checked={task.status} /> */}
                <input type="checkbox" />
                <h3>{task.title}</h3>
                <p className={`text-sm ${task.status? 'line-through' : ''}`}>{task.description}</p>
              </div>
            ))
        }
      </TaskList>

    <AddTodoForm/>

      {/* TaskDetailsModal */}
      
      <TaskDetailsModal isOpen={modalIsOpen} onRequestClose={closeModal} />

    </div>
    </>
  )

}

export default Todos;