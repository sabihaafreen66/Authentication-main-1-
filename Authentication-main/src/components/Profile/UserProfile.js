import { useAuth } from '../../store/auth-context';
import { useHistory, Link } from 'react-router-dom';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const authCtx = useAuth();
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth'); // Redirect to login page
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <p>Email: {authCtx.email}</p> {/* Display the user's email */}
      <button onClick={logoutHandler}>Logout</button>
      <Link to="/change-password" className={classes.changePasswordLink}>Change Password</Link>
    </section>
  );
};

export default UserProfile;
