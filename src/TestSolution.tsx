import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

const UserList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Loading state */}
      {isLoading && <p className="text-center text-blue-500">Loading...</p>}

      {/* Error state */}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* User selection */}
      {!isLoading && !error && users.length > 0 && (
        <div className="my-4">
          <select
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedUser ? selectedUser.id : ""}
            onChange={(e) => {
              const userId = Number(e.target.value);
              const user = users.find((user) => user.id === userId);
              if (user) {
                handleSelectUser(user);
              }
            }}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display user details */}
      {selectedUser && (
        <div className="border p-4 rounded-lg shadow-md bg-gray-100">
          <h2 className="text-xl font-bold mb-2">User Details</h2>
          <p>
            <strong>ID:</strong> {selectedUser.id}
          </p>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Username:</strong> {selectedUser.username}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>City:</strong> {selectedUser.address.city}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>Website:</strong> {selectedUser.website}
          </p>
          <p>
            <strong>Company Name:</strong> {selectedUser.company.name}
          </p>
        </div>
      )}

      {/* User list table */}
      {!selectedUser && !isLoading && !error && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-2 border border-gray-300">ID</th>
                <th className="p-2 border border-gray-300">Name</th>
                <th className="p-2 border border-gray-300">Username</th>
                <th className="p-2 border border-gray-300">Email</th>
                <th className="p-2 border border-gray-300">City</th>
                <th className="p-2 border border-gray-300">Phone</th>
                <th className="p-2 border border-gray-300">Website</th>
                <th className="p-2 border border-gray-300">Company Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-2 border border-gray-300 text-center">
                    {user.id}
                  </td>
                  <td className="p-2 border border-gray-300">{user.name}</td>
                  <td className="p-2 border border-gray-300">
                    {user.username}
                  </td>
                  <td className="p-2 border border-gray-300">{user.email}</td>
                  <td className="p-2 border border-gray-300">
                    {user.address.city}
                  </td>
                  <td className="p-2 border border-gray-300">{user.phone}</td>
                  <td className="p-2 border border-gray-300">{user.website}</td>
                  <td className="p-2 border border-gray-300">
                    {user.company.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
