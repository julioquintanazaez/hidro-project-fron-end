import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BiBox } from 'react-icons/bi';

const EliminarDato = ( props ) => {
	
	const { token } = useContext(UserContext);	
	
	const eliminar_Dato = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/eliminar_dato/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {				
				Swal.fire("Dato eliminado satisfactoriamente", "", "success");				
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleEliminarSubmit = (event) => {
		event.preventDefault();
		if (props.dato.id_dato != null){
			eliminar_Dato(props.dato.id_dato);
		}else{
			Swal.fire("Seleccione un dato", "", "error");
		}
	}
	
	return (	
		<>			
			<button type="submit" 
					className="btn btn-sm btn-danger"
					onClick={(e) => handleEliminarSubmit(e)} > 
					< BiBox/>
			</button>
		</>
	);
}

export default EliminarDato;