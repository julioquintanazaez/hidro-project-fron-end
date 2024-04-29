import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from "yup";
import { useFormik } from "formik";
import { BiBox } from 'react-icons/bi';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


export default function ModificarDato( props ) {
	
	const { token } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const modificar_dato = async () => {
		
		await axios({
			method: 'put',
			url: "/actualizar_dato/" + props.dato.id_dato,
			data: {
				dato_valor : formik.values.dato_valor,											
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				Swal.fire("Dato actualizado exitosamente", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
		});				  
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.dato.id_dato != null){	
			setShow(true);  
		}else{
			Swal.fire("No se ha seleccionado dato", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		dato_valor: Yup.string().trim()
			.required("Se requiere introduzca un valor")		
	});
	
	const registerInitialValues = {
		dato_valor: props.dato.dato_valor
	};
	
	const formik = useFormik({
		initialValues: registerInitialValues,
		onSubmit: (values) => {
			console.log("Modificando data...")
			console.log(values)
			modificar_dato();
			formik.resetForm();
		},
		validationSchema: validationRules
	});
	
	const actual_date = () => {		
		return <p>Fecha para el dato: {format(props.dato.fecha_dato, 'PP')} </p>
	};	
	
	return (
		<>
			<button className="btn btn-sm btn-warning" onClick={handleShow}>
				< BiBox /> 
			</button>
			<Modal show={show} onHide={handleClose} size="lm" > 
				<Modal.Header closeButton>
					<Modal.Title>
						Modificar dato de precipitación
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>			
					<form className="form-control" onSubmit={formik.handleSubmit}>
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
								  placeholder="Introduzca nuevo valor de precipitación"
								/>
								<div>{(formik.errors.dato_valor) ? <p style={{color: 'red'}}>{formik.errors.dato_valor}</p> : null}</div>
							</div>
						</div>						
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-success">
									Actualizar datos
							</button>					
						</div>		
					</form>				
				</Modal.Body>
				<Modal.Footer>		
					<Button className="btn-sm" variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>	  
				</Modal.Footer>
			</Modal>
		</>
	);
}