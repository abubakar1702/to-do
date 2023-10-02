import React, { useEffect, useState } from 'react'


const getLocalUsers = () => {
  try {
    const allUsers = localStorage.getItem('users');
    if (allUsers) {
      return JSON.parse(allUsers);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};

export const View = () => {

  const [users, setUsers] = useState(
    {
      name: "",
      email: "",
      phone: ""
    }
  )

  const [items, setItems] = useState(getLocalUsers())

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(items))
  }, [items])


  const handleInput = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    setUsers((prevUsers) => ({ ...prevUsers, [type]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!users) {
      return
    }
    else {
      setItems([...items, users])
      setUsers({ name: '', email: '', phone: '' })
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen w-full">
      <div className="bg-white p-8 rounded shadow-md w-96 mr-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input onChange={handleInput} value={users.name} type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input onChange={handleInput} value={users.email} type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
            <input onChange={handleInput} value={users.phone} type="tel" id="phone" name="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Submit</button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
