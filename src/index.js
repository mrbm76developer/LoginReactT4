import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthContext, {AuthContextProvider} from "./components/Store/AuthContext";

ReactDOM.render(<AuthContextProvider><App /></AuthContextProvider>, document.getElementById('root'));
