//Import React and ReactDOM libraries
//Create a react component
//Take the react component and show it on the screen

import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import Wins from './components/Wins';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const App = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/wins" element={<Wins />} />
        </Routes>
        </Router>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    );
});
