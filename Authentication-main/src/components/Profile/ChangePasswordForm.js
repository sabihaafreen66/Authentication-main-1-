import { useRef, useState } from 'react';
import { useAuth } from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
//import classes from './ChangePasswordForm.module.css';

const ChangePasswordForm = () => {
  const newPasswordInputRef = useRef();
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useAuth();
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    // Add validation if necessary
    if (enteredNewPassword.trim().length < 6) {
      alert('Password should be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCkaaywAlKWT-maqKqfdTdCr4nHdkOlaoM',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            email: enteredEmail,
            password: enteredNewPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setIsLoading(false);

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = 'Password change failed!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      // Redirect to login page after successful password change
      authCtx.logout();
      history.replace('/auth');
    } catch (err) {
      setIsLoading(false);
      alert(err.message);
    }
  };

  return (
    <section className={classes.changePassword}>
      <h1>Update Login Credentials</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='new-password'>New Password</label>
          <input type='password' id='new-password' minLength="6" required ref={newPasswordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button type='submit'>Update Credentials</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
