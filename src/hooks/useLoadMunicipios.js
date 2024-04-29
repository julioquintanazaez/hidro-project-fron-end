import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadMunicipios(){
	
	const {token} = useContext(UserContext);
	const [municipios, setMunicipios] = useState([]);	
	
	useEffect(() => {
		
		const fetchMunicipios = async () =>{
			await axios({
				method: 'get',
				url: '/leer_municipios/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					setMunicipios(response.data);
				}else {	
					setMunicipios([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchMunicipios();
		
	}, []);
	
	return municipios;
};