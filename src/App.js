import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/authentication/authenitcation';
import Welcome from './components/Profile/Welcome';
import Root from './components/Root/Root';
import Compose from './components/Message/Compose';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/profile/*" element={<Root />} />
      </Routes>
    </div>
  );
}

export default App;
