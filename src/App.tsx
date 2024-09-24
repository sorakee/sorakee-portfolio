import React from 'react';
import { Grommet } from 'grommet';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import { theme } from './styles/theme';
import Test from './test';

const App: React.FC = () => {
  return (
    <Grommet theme={theme} full>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate to='/welcome' replace/>}/>
            <Route path='/welcome' element={<LandingPage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/music' element={<div>Music Placeholder</div>}/>
            <Route path='/projects' element={<div>Project Showcase Placeholder</div>}/>
            <Route path='/dev' element={<Test/>}/>
          </Route> 
        </Routes>
      </BrowserRouter>
    </Grommet>
  );
};

export default App;
