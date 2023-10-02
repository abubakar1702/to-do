import React from 'react';
import Employee from './Employee';

const EmployeeList = ({ employees, onPreview, onUpdate, onDelete }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {employees.map((employee) => (
        <Employee
          key={employee.id}
          employee={employee}
          onPreview={onPreview}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
