import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Notes } from '../api/notes.js';

export default class Form extends Component {
    handleSubmit(event) {
        event.preventDefault();

        const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
        const text = ReactDOM.findDOMNode(this.refs.text).value.trim();

        Meteor.call('notes.insert', title, text);

        ReactDOM.findDOMNode(this.refs.title).value = '';
        ReactDOM.findDOMNode(this.refs.text).value = '';
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <input type="text" className="form-control" ref="title" name="title" placeholder="Type a title" />
                </div>
                <div className="form-group">
                    <textarea className="form-control" ref="text" placeholder="Type a text">

                    </textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        );
    }
}
