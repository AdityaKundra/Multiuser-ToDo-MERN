import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Ensure accessibility

const TaskDetailsModal = ({ isOpen, onRequestClose, modalData}) => {
  
  const [todoData, setTodoData] = useState({
    "title": "",
    "description": "",
    "status": "pending",
    "dueDate": ""});
    
    const [addSubTaskInput, setSubTaskInput] =  useState([]);

    useEffect(()=>{
      if(modalData){
        setTodoData(modalData)
        if (modalData.subTask) {
          setSubTaskInput(modalData.subTask); // Assuming subtasks come with modalData
        }
      }
    },[modalData])

    const hadleSubmit = (e)=>{
      e.preventDefault();
      updateTodo()
    }
    const closeModal = ()=>{
      setTodoData({
        "title": '',
        "description": '',
        "status": '',
        "dueDate": '',
        owner:'', 
        parentId: ''});
      onRequestClose();
    }
    
    const removeSubTask = (index) => {
      setSubTaskInput((prevSubTasks) => prevSubTasks.filter((_, i) => i !== index));
    };

    const addSubTask = (e)=>{
      setSubTaskInput((prevState => [...addSubTaskInput, {title:"", description: "", status: "pending", dueDate: "", owner:modalData.owner, parentId: modalData._id}]))
      console.log(`subTask`);
      console.log(addSubTaskInput);
      // setAllTodos((prevState)=>[...prevState, newData])
    }
    
    const updateTodo = async()=>{
      const token = localStorage.getItem('token');
      const subtaskRequest = await axios.post('http://localhost:5000/api/todo/subTask',addSubTaskInput,{
        headers: {
          'Authorization': `Bearer ${token}`,
        } 
      });
      if(subtaskRequest.status === 200){
        // const subtasksIds = 
        console.log(subtaskRequest.data);
     }
      const newTodo = {id: todoData._id, title: todoData.title, description: todoData.description, status: todoData.status, dueDate: todoData.dueDate};
      const todoRequest = await axios.post('http://localhost:5000/api/todo/update', newTodo,{
        headers: {
          'Authorization': `Bearer ${token}`,
        } 
      });
      if(todoRequest.status === 200){
        setTodoData({
          "title": todoRequest.data.title,
          "description": todoRequest.data.description,
          "status": todoRequest.data.status,
          "dueDate": todoRequest.data.dueDate});
      }
    } 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto my-12"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
    <form onSubmit={hadleSubmit}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <input type="text"
              name="title"
              required
              autoComplete="off"
              value={todoData.title}
              onChange={(e) => setTodoData({...todoData, title: e.target.value})}
              className="p-2 border border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"/>
        </div>
        <div>
          <select
              name="status"
              value={todoData.status}
              onChange={(e) => setTodoData({...todoData, status: e.target.value})}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button onClick={closeModal} className="text-gray-500 hover:text-black">
          &#x2715;
        </button>
      </div>

      {/* <div className="flex space-x-2 mb-4">
        <button className="px-4 py-2 rounded-full bg-red-100 text-red-600">Remind me</button>
        <button className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-600">Personal</button>
        <button className="px-4 py-2 rounded-full bg-blue-100 text-blue-600">#Tags</button>
      </div> */}

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          placeholder="Insert your notes here"
          className="w-full p-3 border rounded-lg resize-none"
          rows="3"
          value={todoData.description}
          onChange={(e) => setTodoData({...todoData, description: e.target.value})}
        ></textarea>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Subtasks</h3>
        <div className="space-y-2">
        {/* {
          addSubTaskInput.map((elm, index) =>{
            return(
              <div key={index}>
                <input type="checkbox" id={`subtask${index+1}`} className="mr-2" />
                <label htmlFor={`subtask${index+1}`}>{elm}</label>
              </div>
            )
          })
        } */}
        {/* {
          addSubTaskInput.map((elm, index)=>{
            return(
              <div key={index}>
                <input type="checkbox" id="subtask1" className="mr-2 w-1/5" />
                <input type="text"
                  name="title"
                  required
                  autoComplete="off"
                  // value={elm.title}
                  onChange={(e) => setTodoData({...todoData, title: e.target.value})}
                  htmlFor="subtask1"
                  className="p-2 border border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-4/6"/>
                &nbsp;
                <span className='text-gray-500 hover:text-black w-1/6' onClick={(elm)=>removeSubTask(elm, index)}>✕</span>
              </div>
            )
          })
        } */}
        {addSubTaskInput.map((elm, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`subtask${index + 1}`}
                  className="mr-2 w-1/5"
                />
                <input
                  type="text"
                  name="title"
                  required
                  autoComplete="off"
                  value={elm.title}
                  onChange={(e) => {
                    const updatedSubTasks = [...addSubTaskInput];
                    updatedSubTasks[index].title = e.target.value;
                    setSubTaskInput(updatedSubTasks);
                  }}
                  className="p-2 border border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-4/6"
                />
                <span
                  className="text-gray-500 hover:text-black w-1/6 cursor-pointer"
                  onClick={() => removeSubTask(index)}
                >
                  ✕
                </span>
              </div>
            ))}

          <button type="button" className="text-blue-500 mt-2" onClick={addSubTask}>+ Add a new subtask</button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Attachments</h3>
        <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded-lg">
          Click to add / drop your files here
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button onClick={closeModal} className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="submit">Save Changes</button>
      </div>
    </form>
    </Modal>
  );
};

export default TaskDetailsModal;
