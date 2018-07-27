const self = {};
const axios = require('axios')
let author = { name: 'Débora', lastname: 'Reyes' }

async function getCategories(info) { 
	let id = info;//si info es un id
	if (Array.isArray(info)) {//si info es un array busco el id de la categoria que tenga el atributo results con el mayor valor
		let filters = info.find(filter => filter.id == 'category')
		if (!filters) return ''
		id = filters.values.find(categorie => categorie.results == Math.max.apply(Math, filters.values.map(c => c.results))).id;
	}
	return axios.get(` https://api.mercadolibre.com/categories/${id}`)
		.then(result => result.data.path_from_root.map(path => path.name))
}

async function createPrice(currency_id, price) {
	if (!price) return false//null precio a convenir
	return {
		currency: await axios.get(`https://api.mercadolibre.com/currencies/${currency_id}`)
			.then(res => res.data.symbol),
		amount: Math.trunc(price),
		decimals: Math.round((price - Math.trunc(price)) * 100)
	}
}

async function createItem(data, description = '') {
	let item = {
		id: data.id,
		title: data.title,
		price: await createPrice(data.currency_id, data.price),
		picture: data.thumbnail,
		condition: data.condition,
		free_shipping: data.shipping.free_shipping
	}
	if (description) {
		item.sold_quantity = data.sold_quantity;
		item.description = description;
		item.categories = await getCategories(data.category_id)
	}
	else if (data.address.state_name) item.state = data.address.state_name
	return item;
}

self.getItems = query => {
	return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`)
		.then(async result => {
			if (result.data.results.length) {
				return {
					author,
					categories: await getCategories(result.data.available_filters),
					items: await Promise.all(result.data.results.map(async item => await createItem(item)))
				}
			}
			throw 'notFound'
		})
}

self.getItem = id => {
	return Promise.all([axios.get(`https://api.mercadolibre.com/items/​${id}`), axios.get(`https://api.mercadolibre.com/items/${id}/description`)])
		.then(async result => {
			return {
				author,
				item: await createItem(result[0].data, result[1].data.plain_text || 'Sin detalles del producto')
			}
		})
}

module.exports = self;