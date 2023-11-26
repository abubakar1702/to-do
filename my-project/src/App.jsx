import React, { useState } from "react";
import NewTaskForm from "./Components/NewTaskForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./Components/CreateUser";

import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/task" element={<NewTaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
