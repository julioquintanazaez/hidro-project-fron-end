import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";
import { BiBox } from 'react-icons/bi';
import useLoadMunicipios from "./../../hooks/useLoadMunicipios";
 
export default function AddEstacion ( props ) {
	
	const {token, currentuser} = useContext(UserContext);
	const municipios = useLoadMunicipios();
	
	const registrar_estacion = async () =>{
		
		await axios({
			method: 'post',
			url: '/crear_estacion/',  
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
			data: {
				nombre_estacion : formik.values.nombre_estacion,
				municipio_id: formik.values.municipio_id
			},			
		}).then(response => {
			if (response.status === 201) {						
				Swal.fire("Estación creada satisfactoriamente", "", "success");	
			}
			else{
				Swal.fire("Problemas creando la estación", "", "error");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Problemas para registrar estación", error.response.data.detail, "error");
		});	 		
	};	
	
	const validationRules = Yup.object().shape({
		nombre_estacion: Yup.string().trim()
			.required("Se requiere el nombre de la estacion"),
		municipio_id: Yup.string().trim()
			.required("Se requiere seleccione un municipio")
	});
	
	const registerInitialValues = {
		nombre_estacion: '',
		municipio_id: '' 
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,		
		onSubmit: (data) => {
			console.log("Enviando datos...");
			registrar_estacion();
			formik.resetForm();
		},
		validationSchema: validationRules,
	});	
	
	const RenderMunicipios = () => {
		return (			
			municipios.map(item => 
				<option value={item.id_municipio} label={item.nombre_municipio}> 
					{item.nombre_municipio}
				</option>				
			) 
		)
	};		
	
	return (
		<>
			{token && (
			<div className="columns m-7 is-two-thirds">
				<form className="box" onSubmit={formik.handleSubmit}>
					<h1 className="title has-text-centered">Registrar estación</h1>
					<div className="field">
						<label className="label">Estación</label>
						<div className="control">
							<input
							  type="text"
							  name="nombre_estacion"
							  value={formik.values.nombre_estacion}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.nombre_estacion && formik.touched.nombre_estacion
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca el nombre de la estación"
							/>
							<div>{(formik.errors.nombre_estacion) ? <p style={{color: 'red'}}>{formik.errors.nombre_estacion}</p> : null}</div>
						</div>
					</div>
					<div className="form-group mt-3" id="municipio_id">
						<label>Seleccione un municipio</label>
						<select
						  name="municipio_id"
						  value={formik.values.municipio_id}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"select" + 
										(formik.errors.municipio_id && formik.touched.municipio_id
										? "is-invalid" : "" )
									}>
							<option value="" label="Seleccione una opcion">Seleccione una opción</option>	
							{RenderMunicipios()} 
						</select>
						<div>{(formik.errors.municipio_id) ? <p style={{color: 'red'}}>{formik.errors.municipio_id}</p> : null}</div>
					</div>	
					<br/>
					<button className="button is-primary" type="submit">
						< BiBox />   Registrar
					</button>
				</form>		
			</div>
			)}
		</>
	);
};
