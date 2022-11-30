import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';

import MarvelServices from "./components/_MarvelServices/marvelServices";

const marvelServices = new MarvelServices();

marvelServices.getAllCharacters()

// marvelServices.getCharacterById('1009144')
//     .then(res => console.log(res));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

