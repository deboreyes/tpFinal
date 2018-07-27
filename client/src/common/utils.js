import queryString from 'query-string';

const searchQuery = (url, query) => {
	try { query = (queryString.parse(query)).search }
	catch (error) { return { error: 'Formato de búsqueda no válido' } }
	if (!query) return { error: query === '' ? 'Ingrese su búsqueda' : 'Página no encontrada' };//query '' null undefined
	return fetch(`${url}${query}`)
		.then(res => {
			if (!res.ok) throw res;
			return res.json();
		})
		.then(result => ({ result, ready: true }))
		.catch(error => ({ error: error.statusText }))
}

const searchParams = (url, params) => {
	return fetch(`${url}${params}`)
		.then(res => {
			if (!res.ok) throw res;
			return res.json();
		})
		.then(result => ({ result: result.item, ready: true, error: '' }))
		.catch(error => ({ ready: false, error: error.statusText }))
}

const getPrice = obj => !obj ? 'Precio a convenir' : `${obj.currency} ${(!obj.decimals ? obj.amount : (obj.amount + obj.decimals / 100).toFixed(2))}`;

export const utils = { searchQuery, searchParams, getPrice }