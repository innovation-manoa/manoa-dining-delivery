import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Requests = new Mongo.Collection('Requests');

/**
 * Create the schema for Stuff
 */
export const RequestsSchema = new SimpleSchema({
  first: {
    label: 'first',
    type: String,
    optional: false,
    max: 20,
  },
  last: {
    label: 'last',
    type: String,
    optional: false,
    max: 20,
  },
  dorm: {
    label: 'dorm',
    type: String,
    optional: false,
    max: 50,
  },
  room: {
    label: 'room',
    type: String,
    optional: false,
    max: 10,
  },
  phone: {
    label: 'phone',
    type: String,
    optional: false,
    regEx: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  },
  requestedFoods: {
    label: 'requestedFoods',
    type: [String],
    optional: false,
  },
  fulfilled: {
    label: 'fulfilled',
    type: Boolean,
    optional: false,
    defaultValue: false,
  },
});

Requests.attachSchema(RequestsSchema);
