import { useAuth } from '../../store/auth-context';
import classes from './UserProfile.module.css';
import { useHistory } from 'react-router-dom';

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
    </section>
  );
};

export default UserProfile;
