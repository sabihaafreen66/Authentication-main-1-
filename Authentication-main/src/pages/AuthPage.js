import { useContext } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import AuthContext from '../store/AuthContext';

const AuthPage = () => {
  const authCtx = useContext(AuthContext);

  const loginHandler = (token) => {
    authCtx.login(token);
  };

  return <AuthForm onLogin={loginHandler} />;
};

export default AuthPage;
