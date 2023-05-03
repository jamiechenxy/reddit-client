import React from 'react';
import './css/App.css';
import { Header } from './features/header/Header';
import { Reddits } from './features/reddits/Reddits';
import { Subreddits } from './features/subreddits/Subreddits';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='main-container'>
        <Reddits />
        <Subreddits />
      </div>
    </div>
  );
}

export default App;
