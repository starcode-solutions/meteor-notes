import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class NavBar extends Component {
    onSearch(event) {
        event.preventDefault();

        const query = ReactDOM.findDOMNode(this.refs.query).value.trim();

        this.props.handleSearch(query);
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Notes App</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <span className="navbar-text">
                        {this.props.notesCount} notes
                    </span>

                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" ref="query" placeholder="Search" onChange={this.onSearch.bind(this)} />
                    </form>
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    notesCount: PropTypes.number.isRequired,
}