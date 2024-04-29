import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadDatos(){
	
	const {token} = useContext(UserContext);
	const [datos, setDatos] = useState([]);	
	
	useEffect(() => {
		
		const fetchDatos = async () =>{
			await axios({
				method: 'get',
				url: '/leer_datos/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					setDatos(response.data);
				}else {	
					setDatos([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchDatos();
		
	}, []);
	
	return datos;
};