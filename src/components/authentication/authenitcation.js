import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';

const Authentication = () => {
  const [showLog, setShowLog] = useState(true);

  const showLogIn = () => {
    setShowLog(true);
  };

  const hideLogIn = () => {
    setShowLog(false);
  };

  return (
    <div>
      {!showLog && <SignUp onShow={showLogIn} />}
      {showLog && <Login onHide={hideLogIn} />}
    </div>
  );
};

export default Authentication;
