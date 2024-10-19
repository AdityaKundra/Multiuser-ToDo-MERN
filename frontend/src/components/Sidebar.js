import React from 'react';

const Sidebar = ({setTodoForm}) => {
  return (
    <div className="w-1/4 p-4 bg-gray-100 h-screen">
      <div className="mb-4">
        <input type="text" placeholder="Search" className="p-2 w-full rounded border"/>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Tasks</h2>
        <ul>
          <li className="py-2">Upcoming</li>
          <li className="py-2">Today</li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Lists</h2>
        <ul>
          <li className="py-2">Personal</li>
          <li className="py-2">Work</li>
          <li className="py-2">List 1</li>
        </ul>
       

      </div>
      <div className="mt-auto">
       {/* Add Todo Button
       <button className="w-full py-2 bg-green-500 text-white rounded mt-4 hover:bg-green-600" onClick={setTodoForm}>
          + Add Todo
        </button> */}
        <button className="w-full py-2 bg-red-500 text-white rounded mt-2">Sign Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
