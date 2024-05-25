import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const url = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkaaywAlKWT-maqKqfdTdCr4nHdkOlaoMY'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkaaywAlKWT-maqKqfdTdCr4nHdkOlaoM';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = 'Authentication failed!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Response Payload:', data); // Print the full payload to the console
      if (isLogin) {
        console.log('Login successful:', data);
      } else {
        console.log('Signup successful:', data);
      }
    } catch (err) {
      console.error('Error:', err); // Log the error to the console for debugging
      alert(err.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;