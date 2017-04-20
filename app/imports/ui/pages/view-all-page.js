import { Template } from 'meteor/templating';
import { Requests } from '../../api/requests/requests.js';

Template.View_All_Page.helpers({
  /**
   * @return {*} The list of requests stored in the collection.
   */
  requestsList() {
    return Requests.find();
  },
});

Template.View_All_Page.onCreated(function onCreated() {
  this.subscribe('Requests');
});
