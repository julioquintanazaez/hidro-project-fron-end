import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";
import { BiBox } from 'react-icons/bi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useLoadEstaciones from "./../../hooks/useLoadEstaciones";
import { format } from "date-fns";

export default function AddDato ( props ) {
	
	const {token, currentuser} = useContext(UserContext);
	const estaciones = useLoadEstaciones();
	
	const registrar_dato = async () =>{
		
		await axios({
			method: 'post',
			url: '/crear_dato/',  
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
			data: {
				dato_valor : formik.values.dato_valor,
				estacion_id: formik.values.estacion_id
			},			
		}).then(response => {
			if (response.status === 201) {						
				Swal.fire("Datos creados satisfactoriamente", "", "success");	
			}
			else{
				Swal.fire("Problemas creando la datos", "", "error");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Problemas para registrando datos", error.response.data.detail, "error");
		});	 		
	};	
	
	const validationRules = Yup.object().shape({
		dato_valor: Yup.string().trim()
			.required("Se requiere introduzca un valor"),
		estacion_id: Yup.string().trim()
			.required("Se requiere seleccione una estación")
	});
	
	const registerInitialValues = {
		dato_valor: '',
		estacion_id: '' 
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,		
		onSubmit: (data) => {
			console.log("Enviando datos...");
			registrar_dato();
			formik.resetForm();
		},
		validationSchema: validationRules,
	});	
	
	const RenderEstaciones = () => {
		return (			
			estaciones.map(item => 
				<option value={item.id_estacion} label={item.nombre_estacion} key={item.id_estacion}> 
					{item.nombre_estacion}
				</option>				
			) 
		)
	};

	const actual_date = () => {		
		return <p>Fecha actual: {format(new Date(), 'PP')} </p>
	};	
	
	return (
		<>
			{token && (
			<div className="columns m-7 is-two-thirds">
				<form className="box" onSubmit={formik.handleSubmit}>
					<label className="label">{actual_date()}</label>
					<div className="field" id="dato_valor">
						<label className="label">Valor de precipitación</label>
						<div className="control">
							<input
							  type="text"
							  name="dato_valor"
							  value={formik.values.dato_valor}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.dato_valor && formik.touched.dato_valor
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca un valor de precipitación"
							/>
							<div>{(formik.errors.dato_valor) ? <p style={{color: 'red'}}>{formik.errors.dato_valor}</p> : null}</div>
						</div>
					</div>
					<div className="field" id="estacion_id">
						<label>Seleccione una estación</label>
						<select
						  name="estacion_id"
						  value={formik.values.estacion_id}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"select" + 
										(formik.errors.estacion_id && formik.touched.estacion_id
										? "is-invalid" : "" )
									}>
							<option value="" label="Seleccione una opcion">Seleccione una opción</option>	
							{RenderEstaciones()} 
						</select>
						<div>{(formik.errors.estacion_id) ? <p style={{color: 'red'}}>{formik.errors.estacion_id}</p> : null}</div>
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
