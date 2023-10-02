import React from 'react';

const Employee = ({ employee, onPreview, onUpdate, onDelete }) => {
  const { name, id, designation, email, phone } = employee;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>Employee ID: {id}</p>
      <p>Designation: {designation}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <div className="mt-2 space-x-2">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onPreview(employee)}
        >
          Preview
        </button>
        <button
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => onUpdate(employee)}
        >
          Update
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Employee;
