import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './store/auth-context';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ChangePasswordForm from './components/Profile/ChangePasswordForm'; // Correct import

function App() {
  const authCtx = useAuth();

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <>
            <Route path='/profile'>
              <UserProfile />
            </Route>
            <Route path='/change-password'>
              <ChangePasswordForm />
            </Route>
          </>
        )}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
