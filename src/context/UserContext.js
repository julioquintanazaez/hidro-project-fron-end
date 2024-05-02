import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ( props ) => {
	
	const [token, setToken] = useState(window.localStorage.getItem("hidro-application-v1.0"));
	const [currentuser, setCurrentUser] = useState({});
	
	useEffect(() => {
		
		const fetchCurrentUser = async () =>{
			await axios({
				method: 'get',
				url: '/users/me/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 200) {						
					console.log("Login successfuly");
					setCurrentUser(response.data);
					window.localStorage.setItem("hidro-application-v1.0", token);	
				}else {	
					console.log("No existe el token");
					setToken(null); 
					window.localStorage.removeItem("hidro-application-v1.0");
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				window.localStorage.removeItem("hidro-application-v1.0");
			});		
		};		
		
		fetchCurrentUser();
		
	}, [token]);
	
	const handleLogout =() => {
		setToken(null);
		window.localStorage.removeItem("hidro-application-v1.0");
	};
	
	return (
		<UserContext.Provider value={{
			token, setToken,
			currentuser, setCurrentUser,
			handleLogout
		}}>
			{ props.children }
		</UserContext.Provider>
	);
};