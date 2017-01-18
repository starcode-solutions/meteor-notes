import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes.js';

import Form from './Form.jsx';
import NavBar from './NavBar.jsx';
import Note from './Note.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    handleSearch(query) {
        this.setState({
            query
        });
    }

    getNotes() {
        let params = {};

        if (this.state.query.length != 0) {
            params.$or = [
                {text: new RegExp(this.state.query, 'i')},
                {title: new RegExp(this.state.query, 'i')}
            ];
        }

        return Notes.find(params, { sort: { createdAt: -1 } }).fetch();
    }

    renderNotes() {
        let notes = this.getNotes(), chunks = [], size = 4;

        while (notes.length > 0) {
            chunks.push(notes.splice(0, size));
        }

        return chunks.map((columns) => (
            <div className="row">
                {this.renderRowNotes(columns)}
            </div>
        ));
    }

    renderRowNotes(notes) {
        return notes.map((note) => (
            <Note key={note._id} note={note} />
        ));
    }

    render() {
        return (
            <div>
                <NavBar notesCount={this.getNotes().length} handleSearch={this.handleSearch.bind(this)} />

                <div className="container">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-sm-12">
                                <Form />
                            </div>
                        </div>
                        {this.renderNotes()}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    notes: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('notes');
    
    return {
        notes: Notes.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, App);