import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useAuth } from './store/auth-context';

function App() {
  const authCtx = useAuth();

  return (
    <Layout>
      <Switch>
        {!authCtx.isLoggedIn && (
          <>
            <Route path='/auth'>
              <AuthPage />
            </Route>
            <Redirect to='/auth' />
          </>
        )}
        {authCtx.isLoggedIn && (
          <>
            <Route path='/' exact>
              <HomePage />
            </Route>
            <Route path='/profile'>
              <UserProfile />
            </Route>
            <Redirect to='/' />
          </>
        )}
      </Switch>
    </Layout>
  );
}

export default App;
