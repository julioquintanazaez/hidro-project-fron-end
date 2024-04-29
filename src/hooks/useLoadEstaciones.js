import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadEstaciones(){
	
	const {token} = useContext(UserContext);
	const [estaciones, setEstaciones] = useState([]);	
	
	useEffect(() => {
		
		const fetchEstaciones = async () =>{
			await axios({
				method: 'get',
				url: '/leer_estaciones/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					setEstaciones(response.data);
				}else {	
					setEstaciones([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchEstaciones();
		
	}, []);
	
	return estaciones;
};