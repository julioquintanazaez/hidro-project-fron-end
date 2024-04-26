import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ProtectedRoute } from './router/ProtectedRoute';
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";
import BarraNavegacion from "./components/BarraNavegacion";

import Inicio from './pages/Inicio.js';

//<Route path="/admin" element={<Admin />} />
	

const App = () => {	
	
	const [message, setMessage] = useState("");
	const {token, currentuser} = useContext(UserContext); 
	
	return (
		<>			
			<BarraNavegacion />
			<Login />
			{token && (				
				<div>							
					<Routes>
						<Route index element={<Inicio />} />
						<Route path="/" element={<Inicio />} />					
						<Route element={<ProtectedRoute isAllowed={ true } />}>
						</Route>			
						<Route path="*" element={<p>There's nothing here: 404!</p>} />
					</Routes>						
				</div>
			)}
				
		</>
	);
};

export default App;