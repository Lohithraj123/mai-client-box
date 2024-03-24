import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import classes from './auth.module.css';
import { wait } from '@testing-library/user-event/dist/utils';

const SignUp = (props) => {
  const [enterEmail, setEnterEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (enteredPassword === confirmPassword) {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJEJQXRKSU3Y_zArycMPAC3dU7v2rlvMk',
          {
            method: 'POST',
            body: JSON.stringify({
              email: enterEmail,
              password: enteredPassword,
              retureSecureToken: true,
            }),
            headers: {
              'content-type': 'application/json',
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data)
        } else {
          const data = await response.json();
          let errmesg = 'Authentication failed';

          if (data && data.error && data.error.message) {
            errmesg = data.error.message;
          }
          throw new Error(errmesg);
        }
      } catch (error) {
        alert(error.message);
      }
      setEnterEmail('');
      setEnteredPassword('');
      setConfirmPassword('');
      props.onShow();
    } else {
      alert('Confirm entered not matching');
    }
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
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={enteredPassword}
            onChange={(event) => setEnteredPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>
        <div className={classes.action}>
          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </div>
        <div className={classes.toggle}>
          <span>Already have an account?</span>
          <button onClick={props.onShow}>Login</button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
