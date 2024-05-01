import React from 'react';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Compose from '../Message/Compose';
import Inbox from '../Message/Inbox';
import SentBox from '../Message/sentBox';
import EmailMessage from '../Message/EmailMessage';
import SentMessage from '../Message/SentMessage';

const Home = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/compose" element={<Compose />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/sentbox" element={<SentBox />} />
        <Route path="/inbox/message" element={<EmailMessage />} />
        <Route path="/sentbox/message" element={<SentMessage />} />
      </Routes>
    </div>
  );
};

export default Home;
