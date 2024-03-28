import React from 'react';
import classes from './SideBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { inboxFill } from '../store/inboxSlice';

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const inboxEmail = useSelector((state) => state.inbox.inboxEmail);

  const showCompose = () => {
    navigate('/profile/compose', { replace: true });
  };

  const showInbox = () => {
    navigate('/profile/inbox', { replace: true });
    dispatch(inboxFill(auth.userEmail));
  };

  const showSentBox = () => {
    navigate('/profile/sentbox', {replace: true})
  }

  let totalUnread = 0;
  inboxEmail.forEach((message) => {
    if (message[1].unread) {
      totalUnread++;
    }
  });

  return (
    <div className={classes.content}>
      <div className={classes.compose} onClick={showCompose}>
        <p>Compose Email</p>
      </div>
      <div className={classes.compose} onClick={showInbox}>
        <p>Inbox{''}</p>
        <span>{totalUnread}</span>
      </div>
      <div className={classes.sent} onClick={showSentBox}>
        <p>Sent</p>
      </div>
    </div>
  );
};

export default SideBar;
