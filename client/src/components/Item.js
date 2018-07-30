import React, { Component } from 'react';
import '../css/Item.css';
import { Breadcrumb } from './Breadcrumb';
import { Message } from './Message';
import { utils } from '../common/utils';

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
		utils.searchParams('/api/items/', this.props.match.params.id).then(res => this.setState(res))
	}

	render() {
		let item = this.state.result;
		let product =
			<div className='Item'>
				<div>
					{item.categories && <Breadcrumb categories={item.categories} />}
					<div className='itemContainer'>
						<div className='itemInfo'>
							<img src={item.picture} alt={item.title} />
							<p className='description'>{item.description}</p>
						</div>
						<div className='itemDetails'>
							<span className='conditions'>{item.condition === 'new' ? 'Nuevo' : item.condition} - {item.sold_quantity} {item.sold_quantity === 1 ? 'vendido' : 'vendidos'}</span>
							<h4>{item.title}</h4>
							<hr />
							<div className='itemPrice'>{utils.getPrice(item.price)}</div>
							<button className='buyNow'>comprar</button>
						</div>
					</div>
				</div>
			</div>
		return this.state.error ? <Message data={this.state.error} /> : (!this.state.ready ? <Message data='Cargando...' /> : product)
	}
}

export default Item;