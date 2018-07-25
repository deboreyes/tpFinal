import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Search.css';

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
				<form>
					<input type='text' name='search' value={this.state.search} onChange={(event) => this.handleOnChange(event)} />
					<Link to={`/items?search=${this.state.search}`}>
						<input type="submit" value='BUSCAR' />
					</Link>
				</form>
			</div>
		)
	}
}

export default Search;