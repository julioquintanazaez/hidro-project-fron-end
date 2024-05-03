import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import AddProvincia from './../utils/provincias/AddProvincia';

const Provincias = ( ) => {
	
	const { token, currentuser } = useContext(UserContext);
	
	
	
	
	return (
		<>			
			<div className="container-fluid-md"> 
				<br/>				
				<div className="columns">
				</div>
				<br/>	
				<div className="columns m-5 is-two-thirds">		
					<div className="columns">
						<AddProvincia />	
					</div>
				</div>	
			</div>		
		</>	
	);	
};

export default Provincias;