import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import { Notes } from '../api/notes.js';

export default class Note extends Component {
    deleteThisNote() {
        Meteor.call('notes.remove', this.props.note._id);
    }

    render() {
        return (
            <div className="col-sm-3">
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">{this.props.note.title}</h4>
                        <p className="card-text">{this.props.note.text}</p>
                        <button className="btn btn-danger" onClick={this.deleteThisNote.bind(this)}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

Note.propTypes = {
    note: PropTypes.object.isRequired,
};
