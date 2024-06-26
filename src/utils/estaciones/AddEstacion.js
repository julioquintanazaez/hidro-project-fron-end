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
				codigo_estacion : formik.values.codigo_estacion,
				altura_estacion : formik.values.altura_estacion,
				norte_estacion : formik.values.norte_estacion,
				sur_estacion : formik.values.sur_estacion,
				municipio_id: formik.values.municipio_id
			},			
		}).then(response => {
			if (response.status === 201) {						
				Swal.fire("Estaci�n creada satisfactoriamente", "", "success");	
			}
			else{
				Swal.fire("Problemas creando la estaci�n", "", "error");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Problemas para registrar estaci�n", error.response.data.detail, "error");
		});	 		
	};	
	
	const validationRules = Yup.object().shape({
		nombre_estacion: Yup.string().trim()
			.required("Se requiere el nombre de la estacion"),
		codigo_estacion: Yup.string().trim()
			.required("Se requiere el codigo de la estacion"),
		altura_estacion: Yup.string().trim()
			.required("Se requiere la altura de la estacion"),
		norte_estacion: Yup.string().trim()
			.required("Se requiere la posici�n norte de la estacion"),
		sur_estacion: Yup.string().trim()
			.required("Se requiere la posici�n sur de la estacion"),
		municipio_id: Yup.string().trim()
			.required("Se requiere seleccione un municipio")
	});
	
	const registerInitialValues = {
		nombre_estacion: '',
		codigo_estacion: '',
		altura_estacion: '',
		norte_estacion: '',
		sur_estacion: '',
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
					<h1 className="title has-text-centered">Registrar estaci�n</h1>
					<div className="field">
						<label className="label">Estaci�n</label>
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
							  placeholder="Introduzca el nombre de la estaci�n"
							/>
							<div>{(formik.errors.nombre_estacion) ? <p style={{color: 'red'}}>{formik.errors.nombre_estacion}</p> : null}</div>
						</div>
					</div>
					<div className="field">
						<label className="label">C�digo</label>
						<div className="control">
							<input
							  type="text"
							  name="codigo_estacion"
							  value={formik.values.codigo_estacion}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.codigo_estacion && formik.touched.codigo_estacion
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca el c�digo de la estaci�n"
							/>
							<div>{(formik.errors.codigo_estacion) ? <p style={{color: 'red'}}>{formik.errors.codigo_estacion}</p> : null}</div>
						</div>
					</div>
					<div className="field">
						<label className="label">Altura</label>
						<div className="control">
							<input
							  type="text"
							  name="altura_estacion"
							  value={formik.values.altura_estacion}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.altura_estacion && formik.touched.altura_estacion
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca la altura de la estaci�n"
							/>
							<div>{(formik.errors.altura_estacion) ? <p style={{color: 'red'}}>{formik.errors.altura_estacion}</p> : null}</div>
						</div>
					</div>
					<div className="field">
						<label className="label">Posici�n Norte</label>
						<div className="control">
							<input
							  type="text"
							  name="norte_estacion"
							  value={formik.values.norte_estacion}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.norte_estacion && formik.touched.norte_estacion
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca la posici�n norte de la estaci�n"
							/>
							<div>{(formik.errors.norte_estacion) ? <p style={{color: 'red'}}>{formik.errors.norte_estacion}</p> : null}</div>
						</div>
					</div>
					<div className="field">
						<label className="label">Posici�n Sur</label>
						<div className="control">
							<input
							  type="text"
							  name="sur_estacion"
							  value={formik.values.sur_estacion}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.sur_estacion && formik.touched.sur_estacion
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca la posici�n sur de la estaci�n"
							/>
							<div>{(formik.errors.sur_estacion) ? <p style={{color: 'red'}}>{formik.errors.sur_estacion}</p> : null}</div>
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
							<option value="" label="Seleccione una opcion">Seleccione una opci�n</option>	
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
