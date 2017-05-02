import { Profiles } from '../../api/profiles/profiles.js';
import { _ } from 'meteor/underscore';

/**
 * A profile to pre-fill the Collection.
 * @type {*[]}
 */
const profileSeed = [
  {
    username: 'johndoehi',
    first: 'John',
    last: 'Doe',
    dorm: 'Frear Hall',
    room: '201A',
    phone: '808-956-8111',
  },
];

if (Profiles.find().count() === 0) {
  _.each(profileSeed, function insertProfile(profile) {
    Profiles.insert(profile);
  });
}
