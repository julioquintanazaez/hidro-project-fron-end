import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router";
import { UserContext } from "../context/UserContext";
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () =>{
	
	const {token, setToken} = useContext(UserContext);
	
	const autenticar_usuario = async () =>{
		
		const form_data = new FormData();
		form_data.append("username",  formik.values.username);
		form_data.append("password", formik.values.password);	
		
		await axios({
			method: 'post',
			url: '/token/',  
			header: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: form_data,			
		}).then(response => {
			if (response.status === 200) {						
				setToken(response.data.access_token);	
			}
			else{
				setErrorMessage(response.data);
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			Swal.fire("Access denied!", error.response.data.detail, "error");
		});	 		
	};	
	
	const validationRules = Yup.object().shape({
		username: Yup.string().trim()	
			.min(5, "Password must be 3 characters at minimum")
			.max(15, "Password must be 15 characters at maximum")
			.required("Username is required"),
		password: Yup.string()
			.min(5, "Password must be 3 characters at minimum")
			.required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
					'Debe contener al menos 5 caracteres, 1 mayúscula, 1 minúscila, 1 caracter especial, y 1 número'),
	});
	
	const registerInitialValues = {
		username: '',
		password: ''
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,		
		onSubmit: (data) => {
			console.log("Enviando datos...");
			autenticar_usuario();
			formik.resetForm();
		},
		validationSchema: validationRules,
	});
	
	return (
		<>
		{!token && (
			<div className="columns m-5 is-two-thirds">
				<form className="box" onSubmit={formik.handleSubmit}>
					<h1 className="title has-text-centered">Autenticarse</h1>
					<div className="field">
						<label className="label">Usuario</label>
						<div className="control">
							<input
							  type="text"
							  name="username"
							  value={formik.values.username}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.username && formik.touched.username
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca su nombre de usuario"
							/>
							<div>{(formik.errors.username) ? <p style={{color: 'red'}}>{formik.errors.username}</p> : null}</div>
						</div>
					</div>
					<div className="field">
						<label className="label">Password</label>
						<div className="control">
							<input
							  type="password"
							  name="password"
							  value={formik.values.password}
							  onChange={formik.handleChange}
							  onBlur={formik.handleBlur}
							  className={"input" + 
											(formik.errors.password && formik.touched.password
											? "is-invalid"
											: ""
										)}
							  placeholder="Introduzca su password"
							/>
							<div>{(formik.errors.password) ? <p style={{color: 'red'}}>{formik.errors.password}</p> : null}</div>
						</div>
					</div>
					<br/>
					<button className="button is-primary" type="submit">
						Entrar
					</button>
				</form>		
			</div>
		)}	
		</>
	);
};

export default Login;
