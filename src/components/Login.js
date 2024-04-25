import React, { useContext, useState } from 'react';
import axios from 'axios';

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Login = () =>{
	
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [errormessage, setErrorMessage] = useState("");
	const {setToken} = useContext(UserContext);
	
	const submitLogin = async () =>{
		
		const form_data = new FormData();
		form_data.append("username", username);
		form_data.append("password", password);	
		
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
		});	 		
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password.length > 5){
			submitLogin();
		}else{
			setErrorMessage("Ensure that the password match the requirements");
		}
	};
	
	return (
		<div className="column">
			<form className="box" onSubmit={handleSubmit}>
				<h1 className="title has-text-centered">Login</h1>
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
				< ErrorMessage message={errormessage} />
				<br/>
				<button className="button is-primary" type="submit">
					Login
				</button>
			</form>		
		</div>	
	);
};

export default Login;
