import React, { useState, useEffect } from 'react';

const CreateUser = () => {
    const [userProfile, setUserProfile] = useState({
        name: '',
        designation: '',
        email: '',
        phone: ''
    });

    const [records, setRecords] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const storedRecords = localStorage.getItem('userRecords');
        if (storedRecords) {
            setRecords(JSON.parse(storedRecords));
        }
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRecords = editingId
            ? records.map((record) =>
                record.id === editingId ? { ...record, ...userProfile } : record
            )
            : [...records, { ...userProfile, id: new Date().getTime().toString() }];

        setRecords(updatedRecords);
        setEditingId(null);
        setUserProfile({ name: '', designation: '', email: '', phone: '' });
        localStorage.setItem('userRecords', JSON.stringify(updatedRecords));
    };

    const handleDelete = (id) => {
        const updatedRecords = records.filter((record) => record.id !== id);
        setRecords(updatedRecords);
        localStorage.setItem('userRecords', JSON.stringify(updatedRecords));
    };

    const handleEdit = (id) => {
        const editRecord = records.find((record) => record.id === id);
        if (editRecord) {
            setUserProfile(editRecord);
            setEditingId(id);
        }
    };

    return (
        <div className="flex flex-row p-6 m-6">
            <div className="w-[50%]">
                <h2 className="text-center text-xl p-5">Create employee profile</h2>
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name">Enter Name:</label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={userProfile.name}
                            name="name"
                            id="name"
                            onChange={handleInput}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="designation">Select Designation:</label>
                        <select
                            name="designation"
                            id="designation"
                            value={userProfile.designation}
                            onChange={handleInput}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select an option</option>
                            <option value="Front-end">Front-end</option>
                            <option value="Back-end">Back-end</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">Enter email:</label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={userProfile.email}
                            name="email"
                            id="email"
                            onChange={handleInput}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone">Enter phone:</label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={userProfile.phone}
                            name="phone"
                            id="phone"
                            onChange={handleInput}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-400"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-[50%]">
                <h2 className="text-center text-xl p-5">Employee Lists</h2>
                <p className="text-center mb-2 text-gray-700">Total Employees: {records.length}</p>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Designation</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((curElem) => (
                            <tr key={curElem.id} className="border-b">
                                <td className="p-2">{curElem.name}</td>
                                <td className="p-2">{curElem.designation}</td>
                                <td className="p-2">{curElem.email}</td>
                                <td className="p-2">{curElem.phone}</td>
                                <td className="p-2 flex">
                                    <button
                                        onClick={() => handleEdit(curElem.id)}
                                        className="bg-yellow-500 text-white p-1 rounded mr-1 flex-1"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(curElem.id)}
                                        className="bg-red-500 text-white p-1 rounded ml-1 flex-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CreateUser;
