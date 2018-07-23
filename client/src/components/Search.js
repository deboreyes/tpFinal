import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom';
import '../css/search.css';
import Results from './Results';
import Item from './Item';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
	}

	handleOnChange(e) {
		this.setState({ search: e.target.value })
	}

	render() {
		return (
			<div className="Search">
				<Router>
					<form >
						<input type='text' name='search' value={this.state.search} onChange={(event) => this.handleOnChange(event)} />
						<Link to={`/items?search=${this.state.search}`}>
							<input type="submit" value='' />
						</Link>
						<Switch>
							<Route exact path='/items/:id' component={Item} />
							<Route path='/items' component={Results} />
						</Switch>
					</form>
				</Router>
			</div>
		)
	}
}

export default Search;