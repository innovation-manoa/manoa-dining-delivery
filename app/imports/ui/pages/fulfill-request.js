import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Requests, RequestsSchema } from '../../api/requests/requests.js';

Template.Fulfill_Request_Page.onCreated(function onCreated() {
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
    }
  },
  'submit .cancel-request'(event) {
    event.preventDefault();
    FlowRouter.go('View_All_Page');
  },
});
