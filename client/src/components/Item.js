import React, { Component } from 'react';
import { Breadcrumb } from './Breadcrumb';

class Item extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: {},
			ready: false,
			error:''
		};
	}

	componentDidMount() {
			fetch('/api/items/' + this.props.match.params.id)
			.then(res=>{
				if (!res.ok) throw Error(res);
				return res.json();
			})
			.then(result => this.setState({ result: result.item, ready: true,error:'' }))
			.catch(error=>this.setState({error,ready:false}))	
	}

	render() {
		let item = this.state.result;
		return (
			<div>              
				{this.state.error && <div>No se encontraron resultados</div>}  
				{this.state.ready &&
					<div>
						{item.categories && <Breadcrumb categories={item.categories} />}
						<img src={item.picture} alt={item.title} />
						<ul>
							<li>{item.condition}</li>
							<li>{item.sold_quantity} vendidos</li>
							<li>{item.title}</li>
							<li>{item.price.currency + (item.price.amount + item.price.decimals / 100)}</li>
						</ul>
						<button onClick={(event) => event.preventDefault()}>comprar</button>
						<p>{item.description}</p>
					</div>}
			</div>
		)
	}
}

export default Item;