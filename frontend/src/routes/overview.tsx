import React from 'react';
import Memes from '../components/memes/Memes';

export default function Overview() {
  return (
    <div>
      <p>here goes the overview of all memes...</p>
      <div className="flex flex-row">
        <div className="basis-2/3">
          <Memes />
        </div>
        <div className="basis-1/3 my-8">
          <header className="grid place-content-center mb-8 py-6 bg-slate-400">
            <p>Filter</p>
          </header>

          <header className="grid place-content-center mb-8 py-6 bg-slate-400">
            <p>Sort</p>
          </header>

          <header className="grid place-content-center mb-8 py-6 bg-slate-400">
            <p>Search</p>
          </header>
        </div>
      </div>
    </div>
    
  )
}
