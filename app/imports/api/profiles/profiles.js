import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Profiles = new Mongo.Collection('Profiles');

/**
 * Create the schema for Profiles
 */
export const ProfilesSchema = new SimpleSchema({
  username: {
    label: 'username',
    type: String,
    optional: false,
    max: 20,
  },
  first: {
    label: 'first',
    type: String,
    optional: true,
    max: 50,
  },
  last: {
    label: 'last',
    type: String,
    optional: true,
    max: 50,
  },
  dorm: {
    label: 'dorm',
    type: String,
    optional: true,
    max: 50,
  },
  room: {
    label: 'room',
    type: String,
    optional: true,
    max: 10,
  },
  phone: {
    label: 'phone',
    type: String,
    optional: true,
    regEx: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  },
});

Profiles.attachSchema(ProfilesSchema);
