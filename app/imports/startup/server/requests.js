import { Requests } from '../../api/requests/requests.js';
import { _ } from 'meteor/underscore';

/**
 * A list of requests to pre-fill the Collection.
 * @type {*[]}
 */

const requestSeeds = [
  {
    first: 'John',
    last: 'Doe',
    dorm: 'Frear Hall',
    room: '201A',
    telephone: '808-956-8111',
    requestedFoods: ['Teri Burger'],
    fulfilled: false,
  },
];

if (Requests.find().count() === 0) {
  _.each(requestSeeds, (request) => Requests.insert(request));
}
