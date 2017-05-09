import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

Template.Browse_Menu_Aloha.onCreated(function onCreated() {
  this.currentTab = new ReactiveVar('Sunday');
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
  tab() {
    return Template.instance().currentTab.get();
  },
  tabData() {
    const instance = Template.instance();
    const tab = Template.instance().currentTab.get();

    const data = {
      Sunday: instance.haleAlohaMenu.get().Sunday,
      Monday: instance.haleAlohaMenu.get().Monday,
      Tuesday: instance.haleAlohaMenu.get().Tuesday,
      Wednesday: instance.haleAlohaMenu.get().Wednesday,
      Thursday: instance.haleAlohaMenu.get().Thursday,
      Friday: instance.haleAlohaMenu.get().Friday,
      Saturday: instance.haleAlohaMenu.get().Saturday,
    };

    return { contentType: tab, items: data[tab] };
  },
});

Template.Browse_Menu_Aloha.events({
  'click .item a'(event, instance) {
    const currentTab = $(event.target).closest('a');

    currentTab.addClass('active');
    $('.item a').not(currentTab).removeClass('active');

    instance.currentTab.set(currentTab.data('template'));
  },
});

