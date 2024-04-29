import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import AddProvincia from './../utils/provincias/AddProvincia';

const Provincias = ( ) => {
	
	const { token, currentuser } = useContext(UserContext);
	
	
	
	
	return (
		<>			
			<div class="container"> 
				<br/>
				<div className="columns">
				
					<AddProvincia />					
										
				</div>
			</div>		
		</>	
	);	
};

export default Provincias;