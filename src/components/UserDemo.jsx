import React, { useState } from "react";
import useUserStore from "../store/useUserStore";

/**
 * Component that demonstrates using the more complex user store
 */
const UserDemo = () => {
  const { user, isLoading, error, login, logout, updateProfile } = useUserStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (name && email) {
      login({ name, email });
    }
  };

  const handleUpdateProfile = () => {
    if (name) {
      updateProfile({ name });
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {user ? (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Current User</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>

          <div className="mt-4 flex flex-col gap-2">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="New name"
              className="p-2 border rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update Profile
              </button>

              <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            className="p-2 border rounded"
          />

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded"
          />

          <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDemo;
