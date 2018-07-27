import React from 'react';
import '../css/Breadcrumb.css';

export const Breadcrumb = props =>
	<div>
		<ul className='ulBreadcrumb'>
			{props.categories.map((categorie, i) => <li key={i}><a href='#'>{categorie}</a>{i !== props.categories.length - 1 && '>'}</li>)}
		</ul>
	</div>