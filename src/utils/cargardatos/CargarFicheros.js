import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";
import { BiBox } from 'react-icons/bi';
import useLoadMunicipios from "./../../hooks/useLoadMunicipios";
 
export default function CargarFicheros ( props ) {
	
	const {token, currentuser} = useContext(UserContext);
	const [selectedFile, setSelectedFile] = useState(null);
	const [loadFile, setLoadFile] = useState(false);
	const [estadistica, setEstadistica] = useState({});
	
	const handleUpload = async () =>{
		
		const formDataFile = new FormData();
		formDataFile.append("file", selectedFile);
		
		await axios({
			method: 'post',
			url: '/cargar_dato_simple_format/',  
			headers: {
				'accept': 'application/json',
				'Content-Type': 'multipart/form-data',
				'Authorization': "Bearer " + token,
			},
			data: formDataFile,			
		}).then(response => {
			if (response.status === 200) {	
				console.log(response.data);
				setEstadistica(response.data);
				Swal.fire("Datos satisfactoriamente", "", "success");	
				setLoadFile(true);
			}
			else{
				Swal.fire("Problemas leyendo el fichero", "", "error");
				setLoadFile(false);
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Problemas para leer fichero", error.response.data.detail, "error");
			setLoadFile(false);
		});	 		
	};	
	
	const handleFileUpload = () => {
		setSelectedFile(event.target.files[0]);
	};
	
	return (
		<>
			<div className="container"> <br/>		
			{token && (
				<div className="rows">
					<div className="columns m-7 is-two-thirds">
						<form className="box">
							<h1 className="title has-text-centered">Cargar datos de precipitaciones</h1>
							<div className="field">
								<label className="label" htmlFor="Datos">Datos</label>
								<div className="control">
									<input
									  type="file"
									  name="cargar_fichero"
									  onChange={handleFileUpload}
									/>
								</div>
							</div>
							<a className="button is-primary" type="submit" onClick={handleUpload} value="Submit">
								< BiBox />  Cargar
							</a>
						</form>		
					</div><br/><br/>
				</div>	
			)}
			{token && loadFile ? (
				<div className="rows">
					<div className="columns">
						<h5>Provincias: {estadistica.provincias_count < 1 ? " No se crearon provincias nuevas" : estadistica.provincias_count}</h5>
						<h5>Municipios: {estadistica.municipios_count < 1 ? " No se crearon municipios nuevos" : estadistica.municipios_count}</h5>
						<h5>Estaciones: {estadistica.estaciones_count < 1 ? " No se crearon estaciones nuevas" : estadistica.estaciones_count}</h5>
						<h5>Datos: {estadistica.datos_count < 1 ? " No se insertaron datos nuevos" : estadistica.datos_count}</h5>
					</div>
				</div>	
			) : null }
			</div> 	
		</>
	);
};
