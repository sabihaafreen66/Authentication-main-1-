import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [token, setToken] = useState('');

  const handleLogin = () => {
    onLogin(token);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter token"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

