import React, { useState } from 'react';
import EmployeeProfile from './EmployeeProfile';
import EmployeeList from './EmployeeList';
import AssignTask from './AssignTask';
import TaskList from './TaskList';

export const ToDo = () => {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);

  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  const handleCreateToggle = () => {
    setShowCreateForm(!showCreateForm);
  };


  const handleEditInput = (e) => {
    setUpdatedTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: Date.now(),
        name: newTask,
      };

      const newList = [...taskList, newTaskObject];
      setTaskList(newList);
      setNewTask("");
    }
  };

  const editTask = (taskId, taskName) => {
    setEditingTaskId(taskId);
    setUpdatedTask(taskName);
  };

  const saveEditedTask = (taskId) => {
    const updatedList = taskList.map((task) =>
      task.id === taskId ? { ...task, name: updatedTask } : task
    );
    setTaskList(updatedList);
    setEditingTaskId(null);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setUpdatedTask("");
  };

  const deleteTask = (taskId) => {
    const newTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(newTaskList);
  };

  const handleAssignTask = (employeeId) => {
    setSelectedEmployee(employeeId);
  };

  const handleUpdateTask = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTask(task.name);
  };

  const handleReassignTask = (task) => {
    setSelectedEmployee(task.assignedTo);
    handleUpdateTask(task);
  };

  // Implement other methods for employees (update, delete, etc.)

  return (
    <div className='p-4'>
      {selectedEmployee && (
        <EmployeeProfile employee={selectedEmployee} />
      )}

      <EmployeeList
        employees={employeeList}
        onViewProfile={setSelectedEmployee}
        onUpdate={handleUpdateEmployee}
        onDelete={handleDeleteEmployee}
      />

      <AssignTask
        employees={employeeList}
        onAssignTask={handleAssignTask}
      />

      {selectedEmployee && (
        <TaskList
          tasks={taskList.filter(task => task.assignedTo === selectedEmployee.id)}
          onUpdateTask={handleUpdateTask}
          onReassignTask={handleReassignTask}
        />
      )}

      <div className='flex items-center mb-4'>
        <input
          className='shadow appearance-none border rounded py-2 px-3 mr-2 w-1/2'
          type='text'
          placeholder='Enter task'
          value={newTask}
          onChange={handleInput}
        />
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          type='button'
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className='bg-white p-4 rounded shadow'>
        {taskList.map((task) => (
          <div key={task.id} className='flex items-center justify-between bg-gray-100 p-3 my-2 rounded'>
            {editingTaskId === task.id ? (
              <>
                <input
                  className='border rounded py-1 px-2 w-2/3 mr-2'
                  type='text'
                  value={updatedTask}
                  onChange={handleEditInput}
                />
                <button
                  className='bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded'
                  onClick={() => saveEditedTask(task.id)}
                >
                  Save
                </button>
                <button
                  className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded'
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h1 className='text-lg'>{task.name}</h1>
                <div>
                  <button
                    className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2'
                    onClick={() => editTask(task.id, task.name)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded'
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
