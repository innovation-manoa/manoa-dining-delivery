/**
 * Created by Terry on 4/22/17.
 */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

Template.menu_content.onCreated(function () {
  var data = this.data;
  console.log('onCreated: ', data);
});

Template.menu_content.onRendered(function () {
  var data = this.data;
  console.log('onRendered: ', data);
});

Template.menu_content.helpers({
  exclamation() {
    var data = Template.instance().data;
    return "That's a lot of " + data.contentType + '!';
  },
});

Template.menu_content.events({
  'click .item a'(event, template) {
    console.log("something");
  },
});
