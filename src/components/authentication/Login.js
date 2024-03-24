import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import classes from './auth.module.css';
import { useDispatch } from 'react-redux';
import { authAction } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enterEmail, setEnterEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJEJQXRKSU3Y_zArycMPAC3dU7v2rlvMk',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enterEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        console.log('Successfully logged in');
        const data = await response.json();
        console.log(data);
        console.log('Successfully logged in');
        dispatch(
          authAction.login({ tokenId: data.idToken, userEmail: data.email }),
        );
        navigate('/welcome', { replace: true });
      } else {
        const data = await response.json();
        let errMsg = 'Authentication Failed!!';

        if (data && data.error && data.error.message) {
          errMsg = data.error.message;
        }
        throw new Error(errMsg);
      }
    } catch (error) {
      alert(error.message);
    }

    setEnterEmail('');
    setEnteredPassword('');
  };

  return (
    <div className={classes.card}>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email address"
            value={enterEmail}
            onChange={(event) => setEnterEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={enteredPassword}
            onChange={(event) => setEnteredPassword(event.target.value)}
          />
        </Form.Group>
        <div className={classes.action}>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
        <div className={classes.toggle}>
          <span>Don't Have Account</span>
          <button onClick={props.onHide}>SignUp</button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
