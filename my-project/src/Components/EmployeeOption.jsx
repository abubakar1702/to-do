// EmployeeOption.js
import React from 'react';

const EmployeeOption = ({ employee }) => {
  return (
    <option value={employee.name}>
      {employee.name} - {employee.designation}
    </option>
  );
};

export default EmployeeOption;
