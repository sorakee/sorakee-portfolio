import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Navigate to='/welcome' replace/>}/>
          <Route path='/welcome' element={<LandingPage/>}/>
          <Route path='/home' element={<div>Hello</div>}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
