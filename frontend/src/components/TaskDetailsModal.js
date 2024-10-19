import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure accessibility

const TaskDetailsModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto my-12"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Make next steps based on important report</h2>
        <button onClick={onRequestClose} className="text-gray-500 hover:text-black">
          &#x2715;
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <button className="px-4 py-2 rounded-full bg-red-100 text-red-600">Remind me</button>
        <button className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-600">Personal</button>
        <button className="px-4 py-2 rounded-full bg-blue-100 text-blue-600">#Tags</button>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Notes</label>
        <textarea
          placeholder="Insert your notes here"
          className="w-full p-3 border rounded-lg resize-none"
          rows="3"
        ></textarea>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Subtasks</h3>
        <div className="space-y-2">
          <div>
            <input type="checkbox" id="subtask1" className="mr-2" />
            <label htmlFor="subtask1">Identify key findings from the report</label>
          </div>
          <div>
            <input type="checkbox" id="subtask2" className="mr-2" />
            <label htmlFor="subtask2">Analyze the implications of those findings</label>
          </div>
          <div>
            <input type="checkbox" id="subtask3" className="mr-2" />
            <label htmlFor="subtask3">Develop action plans based on the findings</label>
          </div>
          <button className="text-blue-500 mt-2">+ Add a new subtask</button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Attachments</h3>
        <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded-lg">
          Click to add / drop your files here
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button onClick={onRequestClose} className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
