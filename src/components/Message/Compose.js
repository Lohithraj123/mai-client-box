import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classes from './Compose.module.css';
import { useSelector } from 'react-redux';

const EmailComposer = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [successFullySentMail, updateSuccessFullySentMail] = useState(false);

  const auth = useSelector((state) => state.auth);

  const submitHandler = async (event) => {
    event.preventDefault();

    const content = editorState.getCurrentContent().getPlainText();

    const indiaTimeZone = 'Asia/Kolkata';
    const date = new Date();
    const options = {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: indiaTimeZone,
    };

    const formatedDate = new Intl.DateTimeFormat('en-us', options).format(date);

    const sentEmailObj = {
      id: Math.random().toString(),
      to: recipient,
      subject: subject,
      email: content,
      date: formatedDate,
      unread: true,
    };

    try {
      const senderEmail = auth.userEmail.replace(/[.@]/g, '');
      const response = await fetch(
        `https://mail-client-box-c8702-default-rtdb.firebaseio.com/${senderEmail}/sendEmail.json`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...sentEmailObj,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.group(data);
      } else {
        const data = await response.json();
        let errMsg = 'Authentication Failed';

        if (data && data.error && data.error.message) {
          errMsg = data.error.message;
        }

        throw new Error(errMsg);
      }
      updateSuccessFullySentMail(true);
    } catch (error) {
      alert(error.message);
    }

    console.log(auth.userEmail);

    const receiveEmailObj = {
      id: Math.random().toString(),
      from: auth.userEmail,
      subject: subject,
      email: content,
      date: formatedDate,
      unread: true,
    };

    try {
      const receiverEmail = recipient.replace(/[.@]/g, '');
      const response = await fetch(
        `https://mail-client-box-c8702-default-rtdb.firebaseio.com/${receiverEmail}/receiveEmail.json`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...receiveEmailObj,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.group(data);
      } else {
        const data = await response.json();
        let errMsg = 'Authentication Failed';

        if (data && data.error && data.error.message) {
          errMsg = data.error.message;
        }

        throw new Error(errMsg);
      }
    } catch (error) {
      alert(error.message);
    }

    setEditorState(EditorState.createEmpty());
    setRecipient('');
    setSubject('');
    setTimeout(() => {
      updateSuccessFullySentMail(false);
    }, 3000);
  };

  const toolbarStyle = {
    fontSize: '14px',
    height: '60px',
    display: 'inline-flex',
    overflow: 'scroll',
    width: 'fit-content',
    // padding: "10px"
  };

  return (
    <div className={classes.emailComposerContainer}>
      {successFullySentMail && (
        <div className={classes.succesfulMsg}>
          <p className={classes.popup}>SuccessFully sent mail.</p>
        </div>
      )}
      <div className={classes.compose}>
        <form onSubmit={submitHandler} className={classes.form}>
          <div>
            <label htmlFor="recipient">Recipient:</label>
            <br />
            <input
              type="text"
              id="recipient"
              className={classes.emailInput}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <br />
            <input
              type="text"
              id="subject"
              className={classes.emailInput}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className={classes.rdwEditorWrapper}>
            <label>Email Content:</label>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              editorStyle={{
                height: '30vh',
                fontSize: '16px',
                overflow: 'hidden',
              }}
              toolbarStyle={toolbarStyle}
            />
          </div>
          <button className={classes.sendButton}>Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default EmailComposer;
