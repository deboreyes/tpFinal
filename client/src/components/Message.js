import React from 'react';
import '../css/Message.css';

export const Message = props =>
    <div className='Message'>
    <h4>
        {props.data === 'loading' && 'Buscando...'}
        {props.data === 'noResults' && 'La búsqueda no produjo resultados'}
        {props.data === 'format' && 'Formato de búsqueda no válido'}
        {props.data === 'empty' && 'Ingrese su búsqueda'}
        {props.data === '404' && 'Página no encontrada'}
    </h4>
    </div>
