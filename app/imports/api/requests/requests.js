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
    // Phone number is of format NNN-NNN-NNNN
    regEx: /^\d{3}-\d{3}-\d{4}$/,
  },
  requestedFoods: {
    label: 'requestedFoods',
    type: [String],
    optional: false,
    max: 3,
  },
  fulfilled: {
    label: 'fulfilled',
    type: Boolean,
    optional: false,
    defaultValue: false,
  },
});

Requests.attachSchema(RequestsSchema);
