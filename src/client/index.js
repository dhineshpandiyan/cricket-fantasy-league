import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Router from './router.jsx';

ReactDOM.render((
  <BrowserRouter>
    <Router />
  </BrowserRouter>
), document.getElementById('root'));