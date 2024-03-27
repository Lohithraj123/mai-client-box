import React from 'react';
import classes from './SideBar.module.css';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  const showCompose = () => {
    navigate('/profile/compose', { replace: true });
  };

  const showInbox = () => {
    navigate('/profile/inbox', { replace: true });
  };

  return (
    <div className={classes.content}>
      <div className={classes.compose} onClick={showCompose}>
        <p>Compose Email</p>
      </div>
      <div className={classes.compose} onClick={showInbox}>
        <p>Inbox</p>
      </div>
    </div>
  );
};

export default SideBar;
