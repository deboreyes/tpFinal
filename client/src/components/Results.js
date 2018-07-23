import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import '../css/results.css';
import { Breadcrumb } from './Breadcrumb';

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
                                <li key={item.id}>
                                    <Link to={`/items/${item.id}`}><img src={item.picture} alt={item.title} /></Link>
                                    <ul>
                                        <li>{item.price.currency + (item.price.amount + item.price.decimals / 100)}</li>
                                        <li>{item.title}</li>
                                        <li>{item.state}</li>
                                        <li>{item.free_shipping ? "Envío gratis" : ""}</li>
                                    </ul>
                                </li>)}
                        </ul>
                    </div>}
            </div>
        )
    }
}
export default Results;