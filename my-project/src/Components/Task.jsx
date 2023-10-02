import React, { useEffect, useState } from 'react';

// const getLocalUsers = () => {
//     try {
//         const allUsers = localStorage.getItem('users');
//         if (allUsers) {
//             return JSON.parse(allUsers);
//         } else {
//             return [];
//         }
//     } catch (error) {
//         console.error("Error parsing JSON:", error);
//         return [];
//     }
// };

const Task = () => {
    const [task, setTask] = useState({
        tasks: "",
        person: ""
    });

    const [storedUser, setStoredUsers] = useState();
    const [storedTasks, setStoredTasks] = useState([]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }, []);


    useEffect(()=>{
        const storedUsers = localStorage.getItem('users')
        if(storedUsers){
            setStoredUsers(JSON.parse(storedUsers))
        }
    },[])


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
                        {storedUser.map((user, index) => (
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
                        <li key={index} className="border p-2 mb-2">
                            <p>Person: {task.person}</p>
                            <p>Task: {task.tasks}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Task;
