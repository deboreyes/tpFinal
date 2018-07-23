import React from 'react';
import '../css/breadcrumb.css';

export const Breadcrumb = props =>
    <div>        
        <ul className='ulBreadcrumb'>
            {props.categories.map((categorie, i) => <li key={i}><a href="#">{categorie}</a>></li>)}
        </ul>
    </div>
