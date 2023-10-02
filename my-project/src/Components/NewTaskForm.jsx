import React, { useState, useEffect } from 'react'



const getLocalTasks = () => {
    try {
        const allRecords = localStorage.getItem('userRecords');
        if (allRecords) {
            return JSON.parse(allRecords);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
    }
};

const NewTaskForm = () => {


    const [task, setTask] = useState({
        tasks: "",
        person: ""
    });

    const [storedRecords, setStoredRecords] = useState(getLocalTasks());

    const [storedTasks, setStoredTasks] = useState([]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }, [storedTasks]);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setTask((prevTasks) => ({ ...prevTasks, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.tasks || !task.person) {
            return;
        } else {
            setStoredTasks([...storedTasks, task]);
            setTask({ tasks: "", person: "" });
        }
    };


    const handleDelete = (index) => {
        const updatedTasks = storedTasks.filter((_, i) => i !== index);
        setStoredTasks(updatedTasks);
    };

    const handleEdit = (index) => {
        const editedTask = storedTasks[index].tasks;
        const editedPerson = storedTasks[index].person;

        setTask({ tasks: editedTask, person: editedPerson });
        handleDelete(index);
    };
    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="task" className="block mb-2">Write task here:</label>
                    <textarea
                        type="text"
                        name="tasks"
                        value={task.tasks}
                        onChange={handleInput}
                        className="w-full p-2 border rounded"
                        rows="4"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="person" className="block mb-2">Select person:</label>
                    <select
                        name="person"
                        id="person"
                        value={task.person}
                        onChange={handleInput}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select a person</option>
                        {storedRecords.map((user, index) => (
                            <option key={index} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add task
                    </button>
                </div>
            </form>

            <div className="mt-4">
                <h2 className="text-xl font-semibold">Task List</h2>
                <ul>
                    {storedTasks.map((task, index) => (
                        <li key={index} className="border p-2 mb-2 hover:shadow-md">
                            <p>Task: {task.tasks}</p>
                            <p>Assigned to: <span className='text-gray-600'>{task.person}</span></p>
                            <div className='flex justify-end'>
                            <button
                                className="bg-blue-500 text-white px-1 m-1 rounded mr-2 hover:shadow-md hover:bg-blue-600"
                                onClick={() => handleEdit(index)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-1 m-1 rounded hover:shadow-md hover:bg-red-600"
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
    )
}

export default NewTaskForm