import React, { Component } from 'react';
import '../css/item.css';
import { Breadcrumb } from './Breadcrumb';

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: {},
			ready: false,
			error: ''
		};
	}

	componentDidMount() {
		fetch('/api/items/' + this.props.match.params.id)
			.then(res => {
				if (!res.ok) throw Error(res);
				return res.json();
			})
			.then(result => this.setState({ result: result.item, ready: true, error: '' }))
			.catch(error => this.setState({ error, ready: false }))
	}

	render() {
		let item = this.state.result;
		return (
			<div className='Item'>
				{this.state.error && <div>No se encontraron resultados</div>}
				{this.state.ready &&
					<div>
						{item.categories && <Breadcrumb categories={item.categories} />}
						<div className='itemContainer'>
							<div className='itemInfo'>
								<img src={item.picture} alt={item.title} />
								<p className='description'>{item.description}</p>
							</div>
							<div className='itemDetails'>
								<span className='conditions'>{item.condition} - {item.sold_quantity} vendidos</span>
								<h4>{item.title}</h4>
								<hr />
								<div className="itemPrice">{item.price.currency + (item.price.amount + item.price.decimals / 100)}</div>
								<button className='buyNow' onClick={(event) => event.preventDefault()}>comprar</button>
							</div>
						</div>
					</div>}
			</div>
		)
	}
}

export default Item;