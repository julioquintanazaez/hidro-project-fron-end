import React, { useContext } from 'react';

import { UserContext } from "../context/UserContext";

const Logout = () => {
	
	const {token, setToken, handleLogout} = useContext(UserContext); 
	
	return (
		<div className="has-text-centered m-6">			
			{token && (
					<button className="button" onClick={handleLogout}>
						Salir 
					</button>
				)
			}	
		</div>
	);
};

export default Logout;