import React, { useState, useEffect } from 'react';

const getLocalTasks = () => {
    try {
        const allRecords = localStorage.getItem('userRecords');
        if (allRecords) {
          return JSON.parse(allRecords);
        } else {
          return [];
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return [];
      }
    };
    
    const NewTaskForm = () => {
      const [task, setTask] = useState({
        tasks: '',
        person: '',
        date: '',
      });
    
      const [storedRecords] = useState(getLocalTasks());
      const [storedTasks, setStoredTasks] = useState([]);
      const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        indexToDelete: null,
      });
    
      useEffect(() => {
        const storedTasksFromLocalStorage =
          JSON.parse(localStorage.getItem('tasks')) || [];
        setStoredTasks(storedTasksFromLocalStorage);
      }, []);
    
      const saveTasksToLocal = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      };
    
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    
      const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setTask((prevTasks) => ({ ...prevTasks, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.tasks || !task.person || !task.date) {
          return;
        } else {
          const formattedDate = formatDate(task.date);
          const updatedTasks = [...storedTasks, { ...task, date: formattedDate }];
          setStoredTasks(updatedTasks);
          saveTasksToLocal(updatedTasks);
          setTask({ tasks: '', person: '', date: '' });
        }
      };
    
      const handleDelete = (index) => {
        setDeleteConfirmation({ isOpen: true, indexToDelete: index });
      };
    
      const confirmDelete = () => {
        const indexToDelete = deleteConfirmation.indexToDelete;
        const updatedTasks = storedTasks.filter((_, i) => i !== indexToDelete);
        setStoredTasks(updatedTasks);
        saveTasksToLocal(updatedTasks);
        setDeleteConfirmation({ isOpen: false, indexToDelete: null });
      };
    
      const cancelDelete = () => {
        setDeleteConfirmation({ isOpen: false, indexToDelete: null });
      };
    
      const handleEdit = (index) => {
        const editedTask = storedTasks[index];
        setTask(editedTask);
      };
    
      const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 pr-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add a New Task
          </h2>
          <div className="mb-4">
            <label htmlFor="task" className="block text-sm font-semibold mb-2">
              Write task here:
            </label>
            <textarea
              type="text"
              name="tasks"
              value={task.tasks}
              onChange={handleInput}
              className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Enter your task..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="person"
              className="block text-sm font-semibold mb-2"
            >
              Select person:
            </label>
            <select
              name="person"
              id="person"
              value={task.person}
              onChange={handleInput}
              className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a person</option>
              {storedRecords.map((user, index) => (
                <option key={index} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-semibold mb-2">
              Select due date:
            </label>
            <input
              type="date"
              name="date"
              value={task.date}
              onChange={handleInput}
              className="w-full p-2 border rounded focus:outline-none focus:shadow-outline"
              min={today}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>

      <div className="md:w-1/2 pl-4 mt-4 md:mt-0 overflow-y-auto h-full">
        <div className="bg-white p-6 rounded-lg shadow-lg h-full">
          <h2 className="text-2xl font-bold mb-4">Task List</h2>
          <ul className="overflow-auto h-full">
            {storedTasks.map((task, index) => (
              <li
                key={index}
                className="border p-4 mb-4 hover:shadow-lg rounded-lg transition duration-300"
              >
                <p className="text-lg font-semibold">Task: {task.tasks}</p>
                <p className="text-sm text-gray-600">
                  Assigned to: {task.person}
                </p>
                <p className="text-sm text-gray-600">Due date: {task.date}</p>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-blue-500 text-white px-2 m-1 rounded mr-2 hover:bg-blue-600 transition duration-300"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 m-1 rounded hover:bg-red-600 transition duration-300"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl font-semibold mb-4">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white mx-2 p-2 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white mx-2 p-2 rounded hover:bg-gray-600"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTaskForm;
