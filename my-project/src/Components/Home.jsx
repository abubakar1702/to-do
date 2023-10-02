import React,{useState} from 'react'
import CreateUser from './CreateUser'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import Navbar from './Navbar'

const Home = () => {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <Navbar />
        <CreateUser />
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  )
}

export default Home