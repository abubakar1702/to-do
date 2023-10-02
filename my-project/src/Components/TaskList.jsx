// TaskList.js
import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">All Tasks List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span>{task.task}</span>
            <span className="text-gray-600 ml-2">Assigned to: {task.assignedUser}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
