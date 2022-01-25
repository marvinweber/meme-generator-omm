import React from 'react';
import testMeme from '../../../images/Batman-Slapping-Robin.jpg';

const Meme = ({  }) => {
    return(
        <div>
            <header className="grid place-content-center my-8 mr-2 py-6 bg-slate-400">
                <div className="flex flex-row">
                  <div className="mx-6">
                    <button type="button" className="hover:bg-slate-200">Likes</button>
                  </div>
                  <div className="mx-6">
                    <button type="button" className="hover:bg-slate-200">Views</button>
                  </div>
                  <div className="mx-6">
                    <button type="button" className="hover:bg-slate-200">Comments</button>
                  </div>
                  <div className="mx-6">
                    <button type="button" className="hover:bg-slate-200">Share</button>
                  </div>
                  <div className="mx-6">
                    <button type="button" className="hover:bg-slate-200">Download</button>
                  </div>
                </div>
            </header>
            <div className="grid place-content-center my-8">
                <h1 className="text-xl">Meme Title</h1>
            </div>
            <div className="grid place-content-center my-2">
                <img src={testMeme} alt=""></img>
            </div>
            <div className="grid">
                <p className="text-sm">Posted by <b>USERNAME</b></p>
            </div>
        </div>
    );
}

export default Meme;