import React from 'react';
import { Grommet } from 'grommet';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <Grommet theme={theme} full>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Navigate to='/welcome' replace/>}/>
            <Route path='/welcome' element={<LandingPage/>}/>
            <Route path='/home' element={<div>Hello</div>}/>
          </Route> 
        </Routes>
      </BrowserRouter>
    </Grommet>
  );
};

export default App;
