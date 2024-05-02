import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import AddEstacion from './../utils/estaciones/AddEstacion';
import CargarEstaciones from "./../utils/cargardatos/CargarEstaciones";

const Estaciones = ( ) => {
	
	const { token, currentuser } = useContext(UserContext);
	
	return (
		<>			
			<div className="container">
				<br/>
				<div className="columns">					
					<AddEstacion />											
				</div>
				<br/>	
				<div className="columns"><br/>					
					<CargarEstaciones />											
				</div>
			</div>		
		</>	
	);	
};

export default Estaciones;