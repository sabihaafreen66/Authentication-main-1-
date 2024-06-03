import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../store/auth-context';
import classes from './Layout.module.css';

const Layout = (props) => {
  const authCtx = useAuth();
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth');
  };

  return (
    <div>
      <header className={classes.header}>
        <Link to='/'>Home</Link>
        {authCtx.isLoggedIn && <Link to='/profile'>Profile</Link>}
        {authCtx.isLoggedIn && <button onClick={logoutHandler} className={classes.logout}>Logout</button>}
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
