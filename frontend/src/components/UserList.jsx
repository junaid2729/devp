// frontend/src/components/UserList.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import './userlist.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users'); // Make sure the URL matches your server's URL
        setUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>Registered Users</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
