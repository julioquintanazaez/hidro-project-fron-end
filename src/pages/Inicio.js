import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import Logout from "./../components/Logout";



const Inicio = () => {	

	const { token, handleLogout } = useContext(UserContext);
	
	
	return (
		
		<div className="container-fluid-md">			
			
			
			
		</div>		
			
	);
  
}

export default Inicio;
