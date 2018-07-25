import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import '../css/Results.css';
import freeShippingImg from '../Assets/free-shipping.png';
import { Breadcrumb } from './Breadcrumb';
import { Message } from './Message';

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
        let query
        this.setState({ ready: false, error: false })
        try { query = (queryString.parse(this.props.location.search)).search }
        catch (error) { return this.setState({ error: 'format' }) }
        if (query) {
            fetch('/api/items?q=' + query)
                .then(res => {
                    if (!res.ok) throw Error(res);
                    return res.json();
                })
                .then(result => this.setState({ items: result.items, categories: result.categories, ready: true, error: '' }))
                .catch(error => this.setState({ error: 'noResults' }))
        }
        else this.setState({ error: query === '' ? 'empty' : '404' });
    }


    componentDidMount() {
        this.updateState()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.updateState();
        }
    }

    getPrice = obj => obj.currency + (obj.decimals ? (obj.amount + obj.decimals / 100).toFixed(2) : obj.amount);

    render() {
        if (this.state.error) return <Message data={this.state.error} />
        if (!this.state.ready) return <Message data='loading' />
        return (
            <div className='Results'>
                {/* {!this.state.ready &&  <Message data='loading'/>} */}
                {this.state.ready &&
                    <div>
                        {this.state.categories && <Breadcrumb categories={this.state.categories} />}
                        <ul className='ulResults'>
                            {this.state.items.map(item =>
                                <li key={item.id} className='product'>
                                    <Link to={`/items/${item.id}`}><img src={item.picture} alt={item.title} className='productImg' /></Link>
                                    <div className="info">
                                        <h4>{item.title}</h4>
                                        <span className="price">{this.getPrice(item.price)}</span>
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