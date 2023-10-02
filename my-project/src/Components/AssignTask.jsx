import React, { useState } from 'react';

const AssignTaskPage = ({ employees, tasks, onAssignTask }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleAssignTask = () => {
    if (selectedEmployee && newTask) {
      onAssignTask(selectedEmployee, newTask);
      setSelectedEmployee('');
      setNewTask('');
    }
  };

  return (
    <div className="assign-task">
      <h2>Assign Task</h2>
      <select
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
        className="border rounded p-1 w-full mt-2"
      >
        <option value="">Select an employee</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Task description"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="border rounded p-1 w-full mt-2"
      />
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
        onClick={handleAssignTask}
      >
        Assign Task
      </button>
    </div>
  );
};

export default AssignTaskPage;
