import React from "react";

function UserList({ users, setUser }) {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <button type="button" onClick={() => setUser(user)}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
