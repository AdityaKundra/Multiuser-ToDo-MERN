import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const TaskDetailsModal = ({ isOpen, onRequestClose, modalData, refreshTodo}) => {
  const [todoData, setTodoData] = useState({
    title: '',
    description: '',
    status: 'pending', // Default status
    dueDate: '',
    owner: '',
    parentId: ''
  });
console.log(modalData)
  const [addSubTaskInput, setSubTaskInput] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (modalData) {
      setTodoData(modalData);
      if (modalData.subTask) {
        setSubTaskInput(modalData.subTask);
      }
    }
  }, [modalData]);

  const closeModal = () => {
    refreshTodo()
    setTodoData({
      title: '',
      description: '',
      status: 'pending', // Reset to default on close
      dueDate: '',
      owner: '',
      parentId: ''
    });
    onRequestClose();
  };

  const removeSubTask = async(index) => {
    try{
      const deleteSubTask = await axios.post('http://localhost:5001/api/todo/removeTask', [addSubTaskInput[index]._id], {
        headers: { 'Authorization': `Bearer ${localStorage.getItem(`token`)}` },
      })
      if(deleteSubTask.status === 200){
        setSubTaskInput((prevSubTasks) => prevSubTasks.filter((_, i) => i !== index));
        refreshTodo()
      }
    }catch(err){
      console.error('Error deleting todo:', err);
    }
  };

  const addSubTask = () => {
    setSubTaskInput((prevState) => [...prevState, { title: "", description: "", status: "pending", dueDate: "", owner: modalData.owner || '', parentId: modalData._id || '' }]);
  };

  const updateTodo = async () => {
    try {
      const newTodo = { id: todoData._id, title: todoData.title, description: todoData.description, status: todoData.status, dueDate: todoData.dueDate };
      const response = await axios.post('http://localhost:5001/api/todo/update', newTodo, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 201) {
        if (addSubTaskInput.length > 0) {
          // await Promise.all(addSubTaskInput.map(subTask => 
            await axios.post('http://localhost:5001/api/todo/subTask', addSubTaskInput, {
              headers: { 'Authorization': `Bearer ${token}` },
            })
          // ));
        }
      }
      closeModal()
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleStatus = async(obj) => {
    try {
      const updateStatus = await axios.post('http://localhost:5001/api/todo/status', obj, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (updateStatus.status === 200) {
        console.log(`Status Updated`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto my-12"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            required
            autoComplete="off"
            value={todoData.title}
            onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <select
            value={todoData.status}
            onChange={(e) => handleStatus({ taskId: todoData?._id, status: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button type="button" onClick={closeModal} className="text-gray-500 hover:text-black ml-2">
            &#x2715;
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            placeholder="Insert your notes here"
            className="w-full p-3 border rounded-lg resize-none"
            rows="3"
            value={todoData.description}
            onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
          ></textarea>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Subtasks</h3>
          <div className="space-y-2">
            {addSubTaskInput.map((elm, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`subtask${index + 1}`}
                  className="mr-2"
                  checked={elm.status === 'completed'} 
                  onClick={(e) => {
                    const status = e.target.checked ? "completed" : "pending";
                    handleStatus({ taskId: elm?._id, status });
                  }}
                />
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={addSubTaskInput[index]?.title || ''} // Ensure it's never undefined
                  onChange={(e) => {
                    const updatedSubTasks = [...addSubTaskInput];
                    updatedSubTasks[index].title = e.target.value;
                    setSubTaskInput(updatedSubTasks);
                  }}
                  className="p-2 border border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-4/6"
                />
                <span className="text-gray-500 hover:text-black cursor-pointer" onClick={() => removeSubTask(index)}>
                  ✕
                </span>
              </div>
            ))}
            <button type="button" className="text-blue-500 mt-2" onClick={addSubTask}>+ Add a new subtask</button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={closeModal} className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="submit">Save Changes</button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskDetailsModal;
