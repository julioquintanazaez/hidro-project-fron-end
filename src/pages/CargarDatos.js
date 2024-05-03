import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import CargarFicheros from "./../utils/cargardatos/CargarFicheros";

const CargarDatos = ( ) => {
	
	const { token, currentuser } = useContext(UserContext);
	
	return (
		<>			
			<div className="container-fluid-md"> <br/>				
				<div className="columns"><br/>						
					< CargarFicheros />
				</div>
				<br/>		
				<div className="columns"><br/>					
						
				</div>
			</div>		
		</>	
	);	
};

export default CargarDatos;