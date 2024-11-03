import React from "react";

const TaskList = ({ children }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Todo's</h2>
        <span className="text-xl">{children.length}</span>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default TaskList;
