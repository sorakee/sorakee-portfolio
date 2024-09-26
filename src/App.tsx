import React from 'react';
import { Grommet } from 'grommet';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import { theme } from './styles/theme';
import Test from './components/test';
import { type BleepsProviderSettings, BleepsProvider } from '@arwes/react';

const bleepsSettings: BleepsProviderSettings = {
  // Shared global audio settings.
  master: {
    volume: 0.9
  },
  bleeps: {
    // A transition bleep sound to play when the user enters the app.
    intro: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/intro.mp3', type: 'audio/mpeg' }
      ]
    },
    // An interactive bleep sound to play when user clicks.
    click: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/click.mp3', type: 'audio/mpeg' }
      ]
    },
    // A bleep sound to play when displaying content that has large number of text.
    content: {
      sources: [
        { src: 'https://arwes.dev/assets/sounds/content.mp3', type: 'audio/mpeg'}
      ]
    }
  }
};

const App: React.FC = () => {
  return (
    <BleepsProvider {...bleepsSettings}>
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
    </BleepsProvider>
  );
};

export default App;
