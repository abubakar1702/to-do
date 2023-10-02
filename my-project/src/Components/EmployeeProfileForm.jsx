// EmployeeProfileForm.js
import React, { useState } from 'react';

const EmployeeProfileForm = () => {
  const [employeeData, setEmployeeData] = useState({
    employeeId: '',
    designation: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform further actions here, such as sending the data to a server.
    console.log('Employee Profile Data:', employeeData);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
            Employee ID:
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={employeeData.employeeId}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
            Designation:
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={employeeData.designation}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={employeeData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EmployeeProfileForm;
