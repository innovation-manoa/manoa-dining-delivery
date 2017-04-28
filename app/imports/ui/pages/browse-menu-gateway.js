import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

Template.Browse_Menu_Gateway.onCreated(function onCreated() {
  this.currentTab = new ReactiveVar('Sunday');
  this.gatewayMenu = new ReactiveVar();
  Meteor.call('getGatewayMenu', (error, result) => {
    const show = result;
    this.gatewayMenu.set(show);
  });
});

Template.Browse_Menu_Gateway.helpers({
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
      Sunday: instance.gatewayMenu.get().Sunday,
      Monday: instance.gatewayMenu.get().Monday,
      Tuesday: instance.gatewayMenu.get().Tuesday,
      Wednesday: instance.gatewayMenu.get().Wednesday,
      Thursday: instance.gatewayMenu.get().Thursday,
      Friday: instance.gatewayMenu.get().Friday,
      Saturday: instance.gatewayMenu.get().Saturday,
    };
    return { contentType: tab, items: data[tab] };
  },
});

Template.Browse_Menu_Gateway.events({
  'click .item a'(event, instance) {
    const currentTab = $(event.target).closest('a');

    currentTab.addClass('active');
    $('.item a').not(currentTab).removeClass('active');

    instance.currentTab.set(currentTab.data('template'));
  },
});

