import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Home_Page.events({
  'click #requestButton'(event) {
    event.preventDefault();
    FlowRouter.go('Add_Request_Page');
  },
});
