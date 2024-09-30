import React from 'react';
import { Grommet } from 'grommet';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { type BleepsProviderSettings, BleepsProvider } from '@arwes/react';
import LandingPage from './sections/LandingPage/LandingPage';
import HomePage from './sections/HomePage/HomePage';
import { theme } from './styles/theme';
import Test from './components/test';
import IntroSFX from '/intro.mp3';
import ClickSFX from '/click.mp3';
import ContentSFX from '/content.mp3';
import PageTransition from './components/PageTransition';

const bleepsSettings: BleepsProviderSettings = {
  // Shared global audio settings.
  master: {
    volume: 1.0
  },
  bleeps: {
    // A transition bleep sound to play when the user enters the app.
    intro: {
      sources: [
        { src: IntroSFX, type: 'audio/mpeg' }
      ]
    },
    // An interactive bleep sound to play when user clicks.
    click: {
      sources: [
        { src: ClickSFX, type: 'audio/mpeg' }
      ]
    },
    // A bleep sound to play when displaying content that has large number of text.
    content: {
      sources: [
        { src: ContentSFX, type: 'audio/mpeg'}
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
              <Route path='/dev' element={<PageTransition onComplete={function (): void {
                console.log("Completed");
              } }/>}/>
            </Route> 
          </Routes>
        </BrowserRouter>
      </Grommet>
    </BleepsProvider>
  );
};

export default App;
