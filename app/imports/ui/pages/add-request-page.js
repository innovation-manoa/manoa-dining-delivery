import { Template } from 'meteor/templating';

Template.Add_Request_Page.onRendered(() => {
  this.$('.dropdown').dropdown();
});

