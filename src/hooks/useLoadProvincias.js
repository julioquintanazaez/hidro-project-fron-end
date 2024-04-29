import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadProvincias(){
	
	const {token} = useContext(UserContext);
	const [provincias, setProvincias] = useState([]);	
	
	useEffect(() => {
		
		const fetchProvincias = async () =>{
			await axios({
				method: 'get',
				url: '/leer_provincias/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					setProvincias(response.data);
				}else {	
					setProvincias([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchProvincias();
		
	}, []);
	
	return provincias;
};