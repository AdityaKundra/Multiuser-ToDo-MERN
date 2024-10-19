import React, { useState } from 'react';

const Icon = ({ name, className = "" }) => {
  const icons = {
    chevronLeft: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
    chevronRight: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
    clock: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    users: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    calendar: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    folder: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>,
    plus: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    moreHorizontal: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>,
    search: <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  };
  return icons[name] || null;
};

const Header = () => (
  <header className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center space-x-4">
      <button className="p-2 hover:bg-gray-100 rounded"><Icon name="chevronLeft" /></button>
      <button className="p-2 hover:bg-gray-100 rounded"><Icon name="chevronRight" /></button>
      <div className="text-sm text-gray-600">Product & Engineering / <span className="font-semibold">Tasks</span></div>
    </div>
    <div className="flex items-center space-x-4">
      <button className="text-sm font-semibold text-blue-600">Share</button>
      <button className="p-2 hover:bg-gray-100 rounded">🕒</button>
      <button className="p-2 hover:bg-gray-100 rounded">⭐</button>
      <button className="p-2 hover:bg-gray-100 rounded"><Icon name="moreHorizontal" /></button>
    </div>
  </header>
);

const TasksHeader = ({ activeTab, setActiveTab }) => (
  <div className="p-4">
    <h1 className="text-2xl font-bold flex items-center mb-4">
      <span className="text-green-500 mr-2">✓</span> Tasks
    </h1>
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-4">
        <button 
          className={`font-semibold ${activeTab === 'byProject' ? 'border-b-2 border-black' : 'text-gray-600'}`}
          onClick={() => setActiveTab('byProject')}
        >
          By project
        </button>
        <button 
          className={`font-semibold ${activeTab === 'mine' ? 'border-b-2 border-black' : 'text-gray-600'}`}
          onClick={() => setActiveTab('mine')}
        >
          Mine
        </button>
        <button className="text-gray-600">3 more...</button>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Filter</span>
        <span className="text-gray-600">Sort</span>
        <Icon name="search" className="text-gray-600" />
        <button className="bg-blue-500 text-white px-3 py-1 rounded">New</button>
      </div>
    </div>
    <div className="flex space-x-2 mb-4">
      <button className="px-3 py-1 bg-gray-100 rounded-full flex items-center">
        <Icon name="clock" className="mr-1" /> Status
      </button>
      <button className="px-3 py-1 bg-gray-100 rounded-full flex items-center">
        <Icon name="users" className="mr-1" /> Assign
      </button>
      <button className="px-3 py-1 bg-gray-100 rounded-full flex items-center">
        <Icon name="calendar" className="mr-1" /> Due
      </button>
      <button className="px-3 py-1 bg-gray-100 rounded-full flex items-center">
        <Icon name="folder" className="mr-1" /> Project
      </button>
      <button className="px-3 py-1 bg-gray-100 rounded-full flex items-center">
        <Icon name="plus" className="mr-1" /> Add filter
      </button>
    </div>
  </div>
);

const TaskItem = ({ icon, title, status, assignees, dueDate }) => (
  <div className="flex items-center p-2 hover:bg-gray-50">
    <div className="w-8">{icon}</div>
    <div className="flex-grow">{title}</div>
    <div className="w-24 text-sm">
      <span className={`px-2 py-1 rounded ${
        status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
        status === 'Done' ? 'bg-green-100 text-green-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </div>
    <div className="w-32 flex -space-x-2">
      {assignees.map((assignee, index) => (
        <img key={index} src={`/api/placeholder/32/32`} alt={assignee} className="w-8 h-8 rounded-full border-2 border-white" />
      ))}
    </div>
    <div className="w-40 text-sm text-gray-600">{dueDate}</div>
  </div>
);

const TaskList = () => (
  <div className="p-4">
    <div className="flex items-center mb-2">
      <span className="text-gray-600 mr-2">🚀</span>
      <h2 className="font-semibold">Help center revamp</h2>
      <span className="ml-2 text-gray-500">8</span>
      <button className="ml-2 text-gray-400 hover:text-gray-600">•••</button>
      <button className="ml-auto text-blue-500 hover:text-blue-600">+</button>
    </div>
    <TaskItem
      icon="📷"
      title="Upload all new product screenshots"
      status="In Progress"
      assignees={['David Tibbitts']}
      dueDate="November 17, 2022"
    />
    <TaskItem
      icon="🚀"
      title="Launch customer blog"
      status="In Progress"
      assignees={['Zoe Ludwig', 'Rebecca Druce']}
      dueDate="November 10, 2022"
    />
    <TaskItem
      icon="✏️"
      title="Embed all Youtube tutorials in articles"
      status="Done"
      assignees={['Rebecca Druce', 'Alex Hao']}
      dueDate="November 13, 2022"
    />
    <TaskItem
      icon="🔍"
      title="Final website audit"
      status="Not Started"
      assignees={['Rebecca Druce']}
      dueDate="November 18, 2022 → November 20, 2022"
    />
  </div>
);

const MyTasks = () => (
  <div className="p-4">
    <h2 className="font-semibold mb-4">My Tasks</h2>
    <TaskItem
      icon="📷"
      title="Review product screenshots"
      status="In Progress"
      assignees={['Me']}
      dueDate="November 20, 2022"
    />
    <TaskItem
      icon="✏️"
      title="Write blog post"
      status="Not Started"
      assignees={['Me']}
      dueDate="November 25, 2022"
    />
  </div>
);

const TaskManagementUI = () => {
  const [activeTab, setActiveTab] = useState('byProject');

  return (
    <div className="bg-white h-screen flex flex-col">
      <Header />
      <TasksHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'byProject' ? <TaskList /> : <MyTasks />}
      <div className="mt-auto p-4 text-sm text-gray-500 flex justify-between items-center">
        <span>COMPLETE 1/8</span>
        <span>1,920 × 1,200</span>
      </div>
    </div>
  );
};

export default TaskManagementUI;