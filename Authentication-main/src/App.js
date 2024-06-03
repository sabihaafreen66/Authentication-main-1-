import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem('userToken');
    const expirationTime = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();

    if (token && expirationTime && currentTime < expirationTime) {
      setIsAuthenticated(true);
    } else {
      logoutUser();
    }
  };

  const loginUser = (token) => {
    const expirationTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes from now
    localStorage.setItem('userToken', token);
    localStorage.setItem('tokenExpiration', expirationTime);
    setIsAuthenticated(true);
    setLogoutTimer(5 * 60 * 1000);
  };

  const logoutUser = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiration');
    setIsAuthenticated(false);
    alert('Session has expired. Please log in again.');
  };

  const setLogoutTimer = (timeout) => {
    setTimeout(() => {
      logoutUser();
    }, timeout);
  };

  return (
    <Router>
      <Route exact path="/">
        {isAuthenticated ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login onLogin={loginUser} />
      </Route>
    </Router>
  );
};

export default App;
