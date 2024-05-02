import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import AddMunicipio from './../utils/municipios/AddMunicipio';

const Municipios = ( ) => {
	
	const { token, currentuser } = useContext(UserContext);
	
	return (
		<>			
			<div className="container"><br/> 
				<div className="columns"><br/>				
					<AddMunicipio />												
				</div>
			</div>		
		</>	
	);	
};

export default Municipios;