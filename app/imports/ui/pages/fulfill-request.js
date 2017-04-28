import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Requests, RequestsSchema } from '../../api/requests/requests.js';

const displayErrorMessages = 'displayErrorMessages';

Template.Fulfill_Request_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = RequestsSchema.namedContext('Fulfill_Request_Page');
});

Template.Fulfill_Request_Page.helpers({
  /**
   * Returns the name of the user who submitted the request.
   */
  requestField(fieldName) {
    const requestData = Requests.findOne({ _id: FlowRouter.getParam('_id') });
    return requestData && requestData[fieldName];
  },
});

Template.Fulfill_Request_Page.events({
  'submit .fulfill-request'(event, instance) {
    event.preventDefault();
    const requestData = Requests.findOne({ _id: FlowRouter.getParam('_id') });
    const first = requestData.first;
    const last = requestData.last;
    const dorm = requestData.dorm;
    const room = requestData.room;
    const phone = requestData.phone;
    const requestedFoods = requestData.foodsRequested;
    const fulfilled = true;

    const updatedRequestData = { first, last, dorm, room, phone, requestedFoods, fulfilled };

    instance.context.resetValidation();
    RequestsSchema.clean(updatedRequestData);
    if (instance.context.isValid()) {
      Requests.update(requestData._id, { $set: updatedRequestData });
      FlowRouter.go('View_All_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'submit .cancel-request'(event) {
    event.preventDefault();
    FlowRouter.go('View_All_Page');
  },
});
