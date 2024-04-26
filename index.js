import "bulma/css/bulma.min.css"
import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import App from './src/App';

import { UserProvider } from "./src/context/UserContext";

axios.defaults.baseURL =  "http://localhost:8000"; 

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(	
	< BrowserRouter	>
		<UserProvider>	
			< App />		
		</UserProvider>	
	</ BrowserRouter	>
);
