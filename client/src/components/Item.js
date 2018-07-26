import React, { Component } from 'react';
import '../css/Item.css';
import { Breadcrumb } from './Breadcrumb';
import { Message } from './Message';
import { getPrice } from '../common/util';

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
			.catch(error => this.setState({ error: 'noResults', ready: false }))
	}

	render() {
		if (this.state.error) return <Message data={this.state.error} />
		if (!this.state.ready) return <Message data='loading' />
		let item = this.state.result;
		return (
			<div className='Item'>
				{/* {!this.state.ready && <Message data={'loading'} />} */}
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
								<div className="itemPrice">{getPrice(item.price)}</div>
								<button className='buyNow'>comprar</button>
							</div>
						</div>
					</div>}
			</div>
		)
	}
}

export default Item;