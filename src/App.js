import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/authentication/authenitcation';
import Welcome from './components/Profile/Welcome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
