import React from 'react'
import TaskForm from './TaskForm'

const AllUsers = ({ users }) => {
    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        Name: {user.name} | Designation: {user.designation}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default AllUsers