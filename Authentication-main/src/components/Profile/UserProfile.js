import { useAuth } from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import ChangePasswordForm from './ChangePasswordForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const authCtx = useAuth();
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth');
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
     <ChangePasswordForm/>
      <button onClick={logoutHandler}>Logout</button>
    </section>
  );
};

export default UserProfile;
