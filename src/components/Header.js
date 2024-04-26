import React, { useContext } from 'react';

import { UserContext } from "../context/UserContext";

const Header = ({ title }) => {
	
	const {token, setToken} = useContext(UserContext); 
	
	const handleLogout =() => {
		setToken(null);
		window.localStorage.removeItem("hidro-application-v1.0");
	};
	
	return (
		<div className="has-text-centered m-6">
			<h1 className="title"> {title} </h1>
				{token && (
						<button className="button" onClick={handleLogout}>
							Logout 
						</button>
					)
				}	
		</div>
	);
};

export default Header;