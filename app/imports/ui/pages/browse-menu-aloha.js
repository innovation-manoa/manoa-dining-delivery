import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

Template.Browse_Menu_Aloha.onCreated(function () {
  if (Meteor.isClient) {
    Meteor.startup(function () {
      Meteor.call('getGatewayMenu', function (error, result) {
        Session.set('gatewayMenu', result);
      });
      Meteor.call('getHaleAlohaMenu', function (error, result) {
        Session.set('haleAlohaMenu', result);
      });
    });
  }
});


Template.Browse_Menu_Aloha.helpers({
  /**
   * @return {*} The list of menu items stored in the JSON file.
   */

  gateway() {
    // To show that it is returning undefined before it shows actual objects
    console.log(Session.get('gatewayMenu'));
    return Session.get('gatewayMenu');
  },
  haleAloha() {
    return Session.get('haleAlohaMenu');
  },
});

