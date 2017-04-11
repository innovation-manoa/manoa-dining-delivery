import { Template } from 'meteor/templating';

Template.Edit_Profile_Page.onRendered(() => {
  this.$('.ui.checkbox').checkbox();
  this.$('.dropdown').dropdown();
});
