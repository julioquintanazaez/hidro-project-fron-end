import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';
import Logout from "./Logout";
import { Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router";

import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

const BarraNavegacion = ( props ) => {
	
	const { token, setToken, currentuser } = useContext(UserContext);
	
	return (
		<>	
			{token && (					
				<div className="container-fluid-md">	
					<div className="columns m-5 is-two-thirds"><br/>	
						<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="warning">
							<Container>
								<Navbar.Brand href="#home">
									Gestor de precipitaciones
								</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto">
										<LinkContainer to="/">
											<Nav.Link>Inicio</Nav.Link>
										</LinkContainer>	
										<LinkContainer to="/precipitaciones">
											<Nav.Link>Precipitaciones</Nav.Link>
										</LinkContainer>	
										<NavDropdown title="Recursos"
													 id="collasible-nav-dropdown">
											<LinkContainer to="/provincias">
												<NavDropdown.Item> Provincias </NavDropdown.Item>
											</LinkContainer>	
											<LinkContainer to="/municipios">
												<NavDropdown.Item> Municipios </NavDropdown.Item>
											</LinkContainer>		
											<LinkContainer to="/estaciones">
												<NavDropdown.Item> Estaciones </NavDropdown.Item>
											</LinkContainer>		
											<LinkContainer to="/datos">
												<NavDropdown.Item> Datos </NavDropdown.Item>
											</LinkContainer>		
											<LinkContainer to="/cargardatos">
												<NavDropdown.Item> Leer datos </NavDropdown.Item>
											</LinkContainer>		
										</NavDropdown>
									</Nav>
									<Logout />
								</Navbar.Collapse>
							</Container>
						</Navbar>						
					</div>				
				</div>	
			)}
		</>		
	);
};

export default BarraNavegacion;