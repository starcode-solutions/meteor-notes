import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
    Meteor.publish('notes', function notesPublication() {
        return Notes.find();
    });
}

Meteor.methods({
    'notes.insert'(title, text) {
        check(text, String);

        Notes.insert({
            title,
            text,
            createdAt: new Date(),
        });
    },
    'notes.remove'(id) {
        check(id, String);

        Notes.remove(id);
    }
});