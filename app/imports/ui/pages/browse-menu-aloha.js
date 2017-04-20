import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

Template.Browse_Menu_Aloha.onCreated(function onCreated() {
  this.haleAlohaMenu = new ReactiveVar();
  Meteor.call('getHaleAlohaMenu', (error, result) => {
    const show = result;
    this.haleAlohaMenu.set(show);
  });
});


Template.Browse_Menu_Aloha.helpers({
  /**
   * @return {*} The list of menu items stored in the JSON file.
   */

  haleAloha() {
    const instance = Template.instance();
    return instance.haleAlohaMenu.get();
  },
});

