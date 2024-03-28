import React from 'react';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Compose from '../Message/Compose';
import Inbox from '../Message/Inbox';
import SentBox from '../Message/sentBox';

const Home = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/compose" element={<Compose />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/sent" element={<SentBox />} />
      </Routes>
    </div>
  );
};

export default Home;
