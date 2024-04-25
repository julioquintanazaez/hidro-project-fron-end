import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Register from "./components/Register";
import Header from "./components/Header";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";
import useCurrentUserLogged from "./hooks/useCurrentUserLogged";

const App = () => {	
	
	const [message, setMessage] = useState("");
	const {token} = useContext(UserContext);  
	const {currentuser} = useContext(UserContext);  
	
	return (
		<>					
			<Header title={"My app for simple access login"} />
			<div className="columns">
				<div className="columns"></div>
				<div className="columns m-5 is-two-thirds">				
				{
					!token ? (
						<div className="columns">
							< Register /> < Login />
						</div>
					) : (				
						currentuser.role
					)
				}
				</div>
				<div className="columns"></div>				
			</div>
		</>
	);
};

export default App;