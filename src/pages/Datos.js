import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import AddDato from './../utils/datos/AddDato';
import TablaDatos from './../utils/datos/TablaDatos';

const Estaciones = ( ) => {
	
	const { token, currentuser } = useContext(UserContext);
	
	return (
		<>			
			<div className="container"> <br/>				
				<div className="columns"><br/>					
					<AddDato />			
				</div>
				<br/>		
				<div className="columns"><br/>					
					<TablaDatos />			
				</div>
			</div>		
		</>	
	);	
};

export default Estaciones;