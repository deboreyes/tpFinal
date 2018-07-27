import React from 'react';
import '../css/Message.css';

export const Message = props =>
	<div className='Message'>
		<h4>
			{props.data === 'Not Found' ? 'No se encontraron resultados para la búsqueda' : props.data}
		</h4>
	</div>