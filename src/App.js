import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/authentication/authenitcation';
import Welcome from './components/Profile/Welcome';
import Root from './components/Root/Root';
import { useDispatch } from 'react-redux';
import { inboxFill } from './components/store/inboxSlice';
import { sentboxFill } from './components/store/sentboxSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('email')) {
      dispatch(inboxFill(localStorage.getItem('email')));
      dispatch(sentboxFill(localStorage.getItem('email')));
    }
  }, []);

  setInterval(() => {
    if (localStorage.getItem('email')) {
      dispatch(inboxFill(localStorage.getItem('email')));
      dispatch(sentboxFill(localStorage.getItem('email')));
      console.log('render');
    }
  }, 2000);

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


