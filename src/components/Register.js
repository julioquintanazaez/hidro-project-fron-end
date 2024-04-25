import React, { useContext, useState } from 'react';
import axios from 'axios';

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Register = () =>{
	
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmationpassword, setConfirmationPassword] = useState("");
	const [errormessage, setErrorMessage] = useState("");
	const {setToken} = useContext(UserContext);
	
	const submitRegistration = async () =>{
		
		const form_data = new FormData();
		form_data.append("username", username);
		form_data.append("password", password);	
		form_data.append("scopes", ["admin", "usuario"]);	
		
		await axios({
			method: 'post',
			url: '/register_user/',                         
			data: form_data,			
		}).then(response => {
			if (response.status === 200) {						
				setToken(response.data.access_token);	
			}
			else{
				console.error({"Error en response ":response.data});	
				setErrorMessage(response.data);
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
		});	 		
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmationpassword && password.length > 5){
			submitRegistration();
		}else{
			setErrorMessage("Ensure that the password match the requirements");
		}
	};
	
	return (
		<div className="column">
			<form className="box" onSubmit={handleSubmit}>
				<h1 className="title has-text-centered">Register</h1>
				<div className="field">
					<label className="label">User Name</label>
					<div className="control">
						<input 
							type="username" 
							placeholder="Enter username" 
							value={username} 
							onChange={(e) => setUserName(e.target.value)}
							className="input"
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Password</label>
					<div className="control">
						<input 
							type="password" 
							placeholder="Enter password" 
							value={password} 
							onChange={(e) => setPassword(e.target.value)}
							className="input"
							required
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Confirmation password</label>
					<div className="control">
						<input 
							type="password" 
							placeholder="Enter confirmation password" 
							value={confirmationpassword} 
							onChange={(e) => setConfirmationPassword(e.target.value)}
							className="input"
							required
						/>
					</div>
				</div>
				< ErrorMessage message={errormessage} />
				<br/>
				<button className="button is-primary" type="submit">
					Register
				</button>
			</form>		
		</div>	
	);
};

export default Register;
