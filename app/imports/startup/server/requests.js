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
    phone: '808-956-8111',
    cafeteria: 'Gateway Cafe',
    requestedFoods: ['Teri Burger'],
    fulfilled: false,
  },
];

if (Requests.find().count() === 0) {
  _.each(requestSeeds, function insertRequest(request) {
    Requests.insert(request);
  });
}
