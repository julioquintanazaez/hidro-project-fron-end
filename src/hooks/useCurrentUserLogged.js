import React, { useEffect, useRef, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useCurrentUserLogged(){
	
	const {token} = useContext(UserContext);
	const refUser = useRef();	
	
	useEffect(() => {
		
		const fetchUser = async () =>{
			await axios({
				method: 'get',
				url: '/users/me/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 200) {
					refUser.current = response.data;
				}else {	
					refUser.current = null;
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchUser();
		
	}, [token]);
	
	return refUser.current;
};