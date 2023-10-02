import React from 'react';

const EmployeeProfile = ({ employee }) => {
  return (
    <div>
      <strong>Employee ID:</strong> {employee.id}<br />
      <strong>Name:</strong> {employee.name}<br />
      <strong>Designation:</strong> {employee.designation}<br />
      <strong>Email:</strong> {employee.email}<br />
      <strong>Phone Number:</strong> {employee.phoneNumber}
    </div>
  );
};

export default EmployeeProfile;
