import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App w-full md:w-10/12 lg:w-8/12 m-auto' id='main'>
      <div>
        <h1 className='text-3xl'>Meme Generator</h1>
      </div>
      <div className='flex justify-between text-center h-12'>
        <a className='bg-gray-400 flex-grow'>
          <div>Meme Overview</div>
        </a>
        <a className='bg-gray-600 flex-grow'>
          <div>Meme Editor</div>
        </a>
        <a className='bg-gray-400 flex-grow'>
          <div>Meme Overview</div>
        </a>
      </div>
    </div>
  );
}

export default App;
