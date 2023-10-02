import React, { useState } from 'react';

const getLocalTasks = () => {
  try {
    const allTasks = localStorage.getItem('tasks');
    if (allTasks) {
      return JSON.parse(allTasks);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};

const NewTaskList = () => {
  const storedTasks = getLocalTasks();

  return (
    <div>
      {storedTasks.map((task, index) => (
        <div key={index} className="border p-2 mb-2">
          <p>Person: {task.person}</p>
          <p>Task: {task.tasks}</p>
        </div>
      ))}
    </div>
  );
};

export default NewTaskList;
