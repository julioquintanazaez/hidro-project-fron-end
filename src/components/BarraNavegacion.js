import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';
import Logout from "./Logout";

const BarraNavegacion = ( props ) => {
	
	const { token, setToken, currentuser } = useContext(UserContext);
	
	return (
		<>	
			{token && (
				<div className="container"> 
					<nav className="navbar" role="navigation" aria-label="main navigation">
						<div className="navbar-brand">
							<a className="navbar-item">
								<svg>
								</svg>
							</a>
							<a role="button" className="navbar-burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample">
								<span aria-hidden="true"></span>
								<span aria-hidden="true"></span>
								<span aria-hidden="true"></span>
								<span aria-hidden="true"></span>
							</a>
						</div>

						<div id="navbarBasicExample" className="navbar-menu">
							<div className="navbar-start">
								<a className="navbar-item" href="/">
									Inicio
								</a>
								<a className="navbar-item" href="/precipitaciones">
									Precipitaciones
								</a>

								<div className="navbar-item has-dropdown is-hoverable">
									<a className="navbar-link">
										Recursos
									</a>

									<div className="navbar-dropdown">
										<a className="navbar-item" href="/provincias">
											Provincias
										</a>
										<a className="navbar-item" href="/municipios">
											Municipios
										</a>
										<a className="navbar-item" href="/estaciones">
											Estaciones
										</a>
										<hr className="navbar-divider"/>
										<a className="navbar-item" href="/datos">
											Entrada de datos
										</a>
										<hr className="navbar-divider"/>
										<a className="navbar-item" href="/cargardatos">
											Leer fichero de datos
										</a>
									</div>
								</div>
							</div>

							<div className="navbar-end">
								<div className="navbar-item">
									<div className="buttons">
										<Logout />
									</div>
								</div>
							</div>
						</div>
					</nav>
				</div>
			)}
		</>		
	);
};

export default BarraNavegacion;