import React, { useState } from 'react';
import { View } from './Components/View';
import Task from './Components/Task';
import NewTaskList from './Components/NewTaskList';
import NewTaskForm from './Components/NewTaskForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUser from './Components/CreateUser';
import TaskForm from './Components/TaskForm';
import Navbar from './Components/Navbar';
import TaskList from './Components/TaskList';

import Example from './Components/Example';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<CreateUser />} />
        <Route path='/task' element={<NewTaskForm />} />

      </Routes>
    </BrowserRouter>

    // <div>
     
    // // <View />
    // // <Task /> 
    // // <NewTaskList />
    // // </div>

    // <div>
    //   <Example />
    // </div>
  );
}

export default App;
