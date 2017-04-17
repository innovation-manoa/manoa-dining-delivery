import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Requests, RequestsSchema } from '../../api/requests/requests.js';

const displayErrorMessages = 'displayErrorMessages';

const dormsList = [
  'Frear Hall',
  'Gateway House',
  'Hale Anuenue',
  'Hale Laulima',
  'Hale Kahawai',
  'Johnson Hall',
  'Hale Aloha Ilima',
  'Hale Aloha Lehua',
  'Hale Aloha Lokelani',
  'Hale Aloha Mokihana',
];

Template.Add_Request_Page.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

Template.Add_Request_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = RequestsSchema.namedContext('Add_Request_Page');
});

Template.Add_Request_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  /**
   * Returns the list of dorms as an object. Used for displaying the list of dorms on the form page.
   */
  dorms() {
    return _.map(dormsList, (dorm) => ({ label: dorm }));
  },
});

Template.Add_Request_Page.events({
  'submit .request-form'(event, instance) {
    event.preventDefault();
    /*
     const firstName = event.target.first.value;
     const lastName = event.target.last.value;
     */
    const firstName = 'John';
    const lastName = 'Doe';
    const dorm = event.target.dorm.value;
    const roomNumber = event.target.room.value;
    const phoneNumber = event.target.phone.value;
    const requestedFoods = event.target.requestedFoods.value;
    const isFulfilled = false;

    const newRequestData = { firstName, lastName, dorm, roomNumber, phoneNumber, requestedFoods, isFulfilled };

    instance.context.resetValidation();
    RequestsSchema.clean(newRequestData);
    if (instance.context.isValid()) {
      console.log('valid');
      Requests.insert(newRequestData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('View_All_Page');
    } else {
      console.log('invalid');
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
