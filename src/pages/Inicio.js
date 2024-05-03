import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';


const Inicio = () => {	

	const { token, handleLogout } = useContext(UserContext);
	
	
	return (
		
		<div className="container-fluid-md">			
			<div className="columns"><br/>						
				
			</div>
			<br/>		
			<div className="columns"><br/>					
				
			</div>
		</div>		
			
	);
  
}

export default Inicio;
