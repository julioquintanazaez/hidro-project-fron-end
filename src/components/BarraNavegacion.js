import './../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from "react-router-bootstrap";


const BarraNavegacion = ( props ) => {
	
	const { token, setToken, currentuser } = useContext(UserContext);
	
	return (
		<>	
			{token && (
				<Navbar expand="lg" fixed="top" className="navbar-light" bg="bg-dark" data-bs-theme="dark">
					<Container>
						<Navbar.Brand href="/">
							Predictor de precipitaciones
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse className="justify-content-end">				
								
							
							
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</>		
	);
};

export default BarraNavegacion;