import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";
import { BiBox } from 'react-icons/bi';

export default function AddProvincia ( ) {
	
	const {token, currentuser} = useContext(UserContext);
	
	const registrar_provincia = async () =>{
		
		await axios({
			method: 'post',
			url: '/crear_provincia/',  
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
			data: {
				nombre_provincia : formik.values.nombre_provincia 
			},			
		}).then(response => {
			if (response.status === 201) {						
				Swal.fire("Provincia creada satisfactoriamente", "", "success");	
			}
			else{
				Swal.fire("Problemas creando la provincia", "", "error");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Problemas para registrar provincia", error.response.data.detail, "error");
		});	 		
	};	
	
	const validationRules = Yup.object().shape({
		nombre_provincia: Yup.string().trim()
			.required("Se requiere el nombre de la provincia")
	});
	
	const registerInitialValues = {
		nombre_provincia: ''
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,		
		onSubmit: (data) => {
			console.log("Enviando datos...");
			registrar_provincia();
			formik.resetForm();
		},
		validationSchema: validationRules,
	});	
	
	
	return (
		<>
			{token && (
			<div className="columns m-7 is-two-thirds">
				<form className="box" onSubmit={formik.handleSubmit}>
					<h1 className="title has-text-centered">Registrar provincia</h1>
					<div className="field">
						<label className="label">Provincia</label>
						<div className="control">
							<input
							  type="text"
							  name="nombre_provincia"
							  value={formik.values.nombre_provincia}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.nombre_provincia && formik.touched.nombre_provincia
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca el nombre de la provincia"
							/>
							<div>{(formik.errors.nombre_provincia) ? <p style={{color: 'red'}}>{formik.errors.nombre_provincia}</p> : null}</div>
						</div>
					</div>
					<br/>
					<button className="button is-primary" type="submit">
						< BiBox />  Registrar
					</button>
				</form>		
			</div>
			)}
		</>
	);
};
