import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import '../css/results.css';
import { Breadcrumb } from './Breadcrumb';
import freeShippingImg from '../Assets/free-shipping.png';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            categories: [],
            ready: false,
            error: ''
        };
    }

    updateState() {        
        let query = (queryString.parse(this.props.location.search)).search;
        fetch('/api/items?q=' + query)
            .then(res => {
                if (!res.ok) throw Error(res);
                return res.json();
            })
            .then(result => this.setState({ items: result.items, categories: result.categories, ready: true, error: '' }))
            .catch(error => this.setState({ error, ready: false }))
    }

    componentDidMount() {
        this.updateState()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.updateState();
        }
    }

    render() {
        return (
            <div className='Results'>
                {this.state.error && <div>No se encontraron resultados</div>}
                {this.state.ready &&
                    <div>
                        {this.state.categories && <Breadcrumb categories={this.state.categories} />}
                        <ul className='ulResults'>
                            {this.state.items.map(item =>
                                <li key={item.id} className='product'>
                                    <Link to={`/items/${item.id}`}><img src={item.picture} alt={item.title} className='productImg' /></Link>
                                    <div className="info">
                                        <h4>{item.title}</h4>
                                        <span className="price">{item.price.currency + (item.price.amount + item.price.decimals / 100)}</span>
                                        <Link to={`/items/${item.id}`}><button className="buyNow">Comprar</button></Link>
                                    </div>
                                    <div className="details">
                                        <span className='state'>{item.state}</span>
                                        {item.free_shipping && <img src={freeShippingImg} alt="Envío gratis" className='freeShipping' />}
                                    </div>
                                </li>)}
                        </ul>
                    </div>}
            </div>
        )
    }
}
export default Results;
