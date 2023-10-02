import React, { useState, useEffect } from 'react';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [assignedUser, setAssignedUser] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const names = storedUsers.map(user => user.name);
    setUserNames(names);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '' || assignedUser === '') return;

    setTasks([...tasks, { task, assignedUser }]);
    setTask('');
    setAssignedUser('');
    alert('Task added!');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Task Form</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="userNameDropdown" className="block font-semibold mb-1">Assign to user:</label>
          <select
            id="userNameDropdown"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a user</option>
            {userNames.map((userName, index) => (
              <option key={index} value={userName}>
                {userName}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Enter a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block w-full">
          Add Task
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <ul>
          {tasks.map((taskItem, index) => (
            <li key={index} className="border p-2 mb-2">
              <p>Assigned to: {taskItem.assignedUser}</p>
              <p>Task: {taskItem.task}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskForm;
