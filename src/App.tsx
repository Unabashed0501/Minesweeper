import React from 'react';
import './App.css';
import MineSweeper from './containers/Minesweeper';

const App: React.FC = () => {
  return (
    <div className='App'>
      <MineSweeper />
    </div>
  );
}

export default App;
