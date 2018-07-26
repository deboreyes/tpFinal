const self = {};
const axios = require("axios")

async function getCategories(info) {
    //si data es un array de categorias busco el id de la categoria que tenga el atributo results con el mayor valor
    let id = Array.isArray(info) ? info.find(categorie => categorie.results == Math.max.apply(Math, info.map(c => c.results))).id : info;
    return axios.get(` https://api.mercadolibre.com/categories/${id}`)
        .then(result => result.data.path_from_root.map(path => path.name))
}

async function createItem(data, description = "") {
    let item = {
        id: data.id,
        title: data.title,
        price: {
            currency: await axios.get(`https://api.mercadolibre.com/currencies/${data.currency_id}`)
                .then(res => res.data.symbol),
            amount: Math.trunc(data.price),
            decimals: Math.round((data.price - Math.trunc(data.price)) * 100)
        },
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
                let categoriesObject = result.data.available_filters.find(filter => filter.id == "category");
                return {
                    author: { name: 'Débora', lastname: 'Reyes' },
                    categories: categoriesObject && await getCategories(categoriesObject.values),
                    items: await Promise.all(result.data.results.map(async item => await createItem(item)))
                }
            }
            throw Error('No se encontraron resultados')
        })
}

self.getItem = id => {
    return Promise.all([axios.get(`https://api.mercadolibre.com/items/​${id}`), axios.get(`https://api.mercadolibre.com/items/${id}/description`)])
        .then(async result => {
            return {
                author: { name: 'Débora', lastname: 'Reyes' },
                item: await createItem(result[0].data, result[1].data.plain_text || 'Sin detalles del producto')
            }
        })
}

module.exports = self;