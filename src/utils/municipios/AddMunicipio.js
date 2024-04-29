import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";
import { BiBox } from 'react-icons/bi';
import useLoadProvincias from "./../../hooks/useLoadProvincias";
 
export default function AddMunicipio ( props ) {
	
	const {token, currentuser} = useContext(UserContext);
	const provincias = useLoadProvincias();
	
	const registrar_municipio = async () =>{
		
		await axios({
			method: 'post',
			url: '/crear_municipio/',  
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
			data: {
				nombre_municipio : formik.values.nombre_municipio,
				provincia_id: formik.values.provincia_id
			},			
		}).then(response => {
			if (response.status === 201) {						
				Swal.fire("Municipio creado satisfactoriamente", "", "success");	
			}
			else{
				Swal.fire("Problemas creando el municipio", "", "error");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Problemas para registrar municipio", error.response.data.detail, "error");
		});	 		
	};	
	
	const validationRules = Yup.object().shape({
		nombre_municipio: Yup.string().trim()
			.required("Se requiere el nombre del municipio"),
		provincia_id: Yup.string().trim()
			.required("Se requiere seleccione la provincia")
	});
	
	const registerInitialValues = {
		nombre_municipio: '',
		provincia_id: '' 
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,		
		onSubmit: (data) => {
			console.log("Enviando datos...");
			registrar_municipio();
			formik.resetForm();
		},
		validationSchema: validationRules,
	});	
	
	const RenderProvincias = () => {
		return (			
			provincias.map(item => 
				<option value={item.id_provincia} label={item.nombre_provincia}> 
					{item.nombre_provincia}
				</option>				
			) 
		)
	};		
	
	return (
		<>
			{token && (
			<div className="columns m-7 is-two-thirds">
				<form className="box" onSubmit={formik.handleSubmit}>
					<h1 className="title has-text-centered">Registrar municipio</h1>
					<div className="field">
						<label className="label">Municipio</label>
						<div className="control">
							<input
							  type="text"
							  name="nombre_municipio"
							  value={formik.values.nombre_municipio}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.nombre_municipio && formik.touched.nombre_municipio
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca el nombre del municipio"
							/>
							<div>{(formik.errors.nombre_municipio) ? <p style={{color: 'red'}}>{formik.errors.nombre_municipio}</p> : null}</div>
						</div>
					</div>
					<div className="form-group mt-3" id="provincia_id">
						<label>Seleccione una provincia</label>
						<select
						  name="provincia_id"
						  value={formik.values.provincia_id}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"select" + 
										(formik.errors.provincia_id && formik.touched.provincia_id
										? "is-invalid" : "" )
									}>
							<option value="" label="Seleccione una opcion">Seleccione una opción</option>	
							{RenderProvincias()} 
						</select>
						<div>{(formik.errors.provincia_id) ? <p style={{color: 'red'}}>{formik.errors.provincia_id}</p> : null}</div>
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
