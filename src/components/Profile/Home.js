import React from 'react';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Compose from '../Message/Compose';

const Home = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/compose" element={<Compose />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
};

export default Home;
