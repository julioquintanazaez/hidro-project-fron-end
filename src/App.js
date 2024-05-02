import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ProtectedRoute } from './router/ProtectedRoute';
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";
import BarraNavegacion from "./components/BarraNavegacion";

import Inicio from './pages/Inicio.js';
import Provincias from './pages/Provincias.js';
import Municipios from './pages/Municipios.js';
import Estaciones from './pages/Estaciones.js';
import Datos from './pages/Datos.js';
import Usuarios from './pages/Usuarios.js';
import Precipitaciones from './pages/Precipitaciones.js';
import CargarDatos from './pages/CargarDatos.js';


const App = () => {	
	
	const [message, setMessage] = useState("");
	const {token, currentuser} = useContext(UserContext); 
	
	return (
		<>				
			<BarraNavegacion />
			<Login />
			{token && (				
				<div className="columns">							
					<Routes>
						<Route index element={<Inicio />} />
						<Route path="/" element={<Inicio />} />	
						<Route element={<ProtectedRoute isAllowed={ true } />}>
							<Route path="/precipitaciones" element={<Precipitaciones />} />
						</Route>	
						<Route element={<ProtectedRoute isAllowed={ true } />}>
							<Route path="/provincias" element={<Provincias />} />
							<Route path="/municipios" element={<Municipios />} />
							<Route path="/estaciones" element={<Estaciones />} />
							<Route path="/datos" element={<Datos />} />
							<Route path="/usuarios" element={<Usuarios />} />
							<Route path="/cargardatos" element={<CargarDatos />} />
						</Route>			
						<Route path="*" element={<p>There's nothing here: 404!</p>} />
					</Routes>						
				</div>
			)}				
		</>
	);
};

export default App;