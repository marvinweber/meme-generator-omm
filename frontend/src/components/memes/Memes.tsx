import React from 'react';
import { useSelector } from 'react-redux';

import Meme from './meme/Meme';

const Memes = ({}) => {
    //const memes = useSelector((state) => state.memes);

    return(
        <ul>
            <li>
                <Meme />
            </li>
            <li>
                <Meme />  
            </li>
        </ul>
    );
}

export default Memes;