import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import { BiBox } from 'react-icons/bi';
import { format } from "date-fns";
import moment from "moment";

import useLoadDatos from "./../../hooks/useLoadDatos";
import EliminarDato from "./EliminarDato"
import ModificarDato from "./ModificarDato"
 
const TableDatos = ( props ) => {
	
	const { token } = useContext(UserContext);	
	const datos = useLoadDatos();
	const [query, setQuery] = useState("");
	const [filteredDatos, setFilteredDatos] = useState([]);
	
	useEffect(() => {
		const filtered = datos.filter(item =>
			item.nombre_estacion.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredDatos(filtered);
	}, [query]);
	
	const renderButones = ( dato ) => {
		return (
			<td>
				< EliminarDato dato={dato} />
				< ModificarDato dato={dato} />
			</td>
		);
	};
	
	const renderFilterData = ( ) => {		
		return filteredDatos.map((dato, index) => (
			<tr key={dato.id_dato}>
				<td>{dato.nombre_estacion}</td>
				<td>{moment(dato.dato_fecha).format("MMM Do YY")}</td>
				<td>{dato.dato_valor}</td>	
				<td>{dato.nombre_estacion}</td>	
				<td>{dato.codigo_estacion}</td>	
				<td>{dato.altura_estacion}</td>	
				<td>{dato.norte_estacion}</td>	
				<td>{dato.sur_estacion}</td>	
				{renderButones( dato )}
			</tr>
		));		
	};
	
	const renderData = ( ) => {		
		return datos.map((dato, index) => (
			<tr key={dato.id_dato}>
				<td>{dato.nombre_estacion}</td>
				<td>{moment(dato.dato_fecha).format("MMM Do YY")}</td>
				<td>{dato.dato_valor}</td>		
				<td>{dato.nombre_estacion}</td>	
				<td>{dato.codigo_estacion}</td>	
				<td>{dato.altura_estacion}</td>	
				<td>{dato.norte_estacion}</td>	
				<td>{dato.sur_estacion}</td>	
				{renderButones( dato )}
			</tr>
		));
	};
	
	return (
		<>
			{!token && !datos ? (
				<p> No existen datos para mostrar </p>
			) : (
				<>
					<div className="box">
						<input
							type="text"
							placeholder="Search..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<div clasName="box">					
						<table className="table is-fullwith">
							<thead>
								<tr>
									<th>Estación</th>
									<th>Fecha</th>
									<th>Precipitación</th>
									<th>Estación</th>
									<th>Código</th>
									<th>Altura</th>
									<th>Norte</th>
									<th>Sur</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
							{filteredDatos.length > 0 ? (
								renderFilterData()
							) : (
								renderData()
							)}
							</tbody>
						</table>
					</div>
				</>
			)}
		</>
	);
};

export default TableDatos;