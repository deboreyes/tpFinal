import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Results.css';
import freeShippingImg from '../Assets/free-shipping.png';
import { Breadcrumb } from './Breadcrumb';
import { Message } from './Message';
import { utils } from '../common/utils';

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: { items: [], categories: [] },
			ready: false,
			error: ''
		};
	}

	async update() {
		this.setState(await utils.searchQuery('/api/items?q=', this.props.location.search))
	}

	componentDidMount() {
		this.update()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location.search !== this.props.location.search) {
			this.setState({ ready: false, error: '' })
			this.update();
		}
	}

	render() {
		if (this.state.error) return <Message data={this.state.error} />
		if (!this.state.ready) return <Message data='Cargando...' />
		return (
			<div className='Results'>
				<div>
					{this.state.result.categories && <Breadcrumb categories={this.state.result.categories} />}
					<ul className='ulResults'>
						{this.state.result.items.map(item =>
							<li key={item.id} className='product'>
								<Link to={`/items/${item.id}`}><img src={item.picture} alt={item.title} className='productImg' /></Link>
								<div className='info'>
									<h4>{item.title}</h4>
									<span className='price'>{utils.getPrice(item.price)}</span>
									<Link to={`/items/${item.id}`}><button className='buyNow'>Comprar</button></Link>
								</div>
								<div className='details'>
									<span className='state'>{item.state}</span>
									{item.free_shipping && <img src={freeShippingImg} alt='Envío gratis' className='freeShipping' />}
								</div>
							</li>)}
					</ul>
				</div>
			</div>
		)
	}
}

export default Results;