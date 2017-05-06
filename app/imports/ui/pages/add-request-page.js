import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Requests, RequestsSchema } from '../../api/requests/requests.js';
import { Profiles } from '../../api/profiles/profiles.js';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

const displayErrorMessages = 'displayErrorMessages';

const dormsList = [
  'Frear Hall',
  'Gateway House',
  'Hale Anuenue',
  'Hale Laulima',
  'Hale Kahawai',
  'Johnson Hall',
  'Hale Aloha Ilima',
  'Hale Aloha Lehua',
  'Hale Aloha Lokelani',
  'Hale Aloha Mokihana',
];

const day = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thurday',
  5: 'Friday',
  6: 'Saturday',
};

const cafeterias = ['Hale Aloha Cafe', 'Gateway Cafe'];

Template.Add_Request_Page.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
  this.$('.ui.radio.checkbox').checkbox();
});

Template.Add_Request_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = RequestsSchema.namedContext('Add_Request_Page');

  this.haleAlohaMenu = new ReactiveVar();
  this.gatewayMenu = new ReactiveVar();
  Meteor.call('getHaleAlohaMenu', (error, result) => {
    this.haleAlohaMenu.set(result);
  });
  Meteor.call('getGatewayMenu', (error, result) => {
    this.gatewayMenu.set(result);
  });

  this.cafeSelected = new ReactiveVar();
});

Template.Add_Request_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  /**
   * Returns the list of dorms as an object. Used for displaying the list of dorms on the form page.
   */
  profileField(fieldName) {
    const profileData = Profiles.findOne({ username: Meteor.user().profile.name });
    return profileData && profileData[fieldName];
  },
  isValidUser() {
    return Meteor.user().profile.name === FlowRouter.getParam('username');
  },
  dorms() {
    return _.map(dormsList, (dorm) => ({ label: dorm }));
  },
  /**
   * Returns the list of the current menu items based on the current day, time, and cafeteria selected.
   * @returns {[*]}
   */
  menu() {
    const currentDay = day[new Date().getDay()];
    const currentTime = new Date().toTimeString().split(' ').slice(0, 1)[0];

    const instance = Template.instance();
    const cafeSelected = instance.cafeSelected.get();
    let data;
    if (cafeSelected === 'Hale Aloha Cafe') {
      data = {
        Sunday: instance.haleAlohaMenu.get().Sunday,
        Monday: instance.haleAlohaMenu.get().Monday,
        Tuesday: instance.haleAlohaMenu.get().Tuesday,
        Wednesday: instance.haleAlohaMenu.get().Wednesday,
        Thursday: instance.haleAlohaMenu.get().Thursday,
        Friday: instance.haleAlohaMenu.get().Friday,
        Saturday: instance.haleAlohaMenu.get().Saturday,
      };
    } else if (cafeSelected === 'Gateway Cafe') {
      data = {
        Sunday: instance.gatewayMenu.get().Sunday,
        Monday: instance.gatewayMenu.get().Monday,
        Tuesday: instance.gatewayMenu.get().Tuesday,
        Wednesday: instance.gatewayMenu.get().Wednesday,
        Thursday: instance.gatewayMenu.get().Thursday,
        Friday: instance.gatewayMenu.get().Friday,
        Saturday: instance.gatewayMenu.get().Saturday,
      };
    }
    // No cafeteria selected - prompt user to select a cafeteria
    if (!data) return [{ label: 'You must select a cafeteria to order from first!' }];

    const menuItems = [];
    // Get the menu (breakfast, lunch, dinner) the cafe selected and current time/day
    if (cafeSelected === 'Gateway Cafe') {
      if (currentTime >= '07:00:00' && currentTime <= '10:00:00') {
        _.each(data[currentDay].Breakfast, menuItem => menuItems.push(menuItem[0]));
      } else if (currentTime >= '11:00:00' && currentTime <= '14:00:00') {
        _.each(data[currentDay].Lunch, menuItem => menuItems.push(menuItem[0]));
      } else if (currentTime >= '16:30:00' && currentTime <= '20:00:00') {
        _.each(data[currentDay].Dinner, menuItem => menuItems.push(menuItem[0]));
      }
    } else {
      if ((currentDay === 'Saturday' || currentDay === 'Sunday') &&
          currentTime >= '10:00:00' &&
          currentTime <= '13:30:00') {
        _.each(data[currentDay].Lunch, menuItem => menuItems.push(menuItem[0]));
      } else if (currentTime >= '16:30:00' && currentTime <= '20:00:00') {
        _.each(data[currentDay].Dinner, menuItem => menuItems.push(menuItem[0]));
      }
    }
    // No items in menu - cafeteria probably closed
    if (menuItems.length === 0) return [{ label: 'Cafeteria is currently closed.' }];
    return _.map(menuItems, menuItem => ({ label: menuItem }));
  },
  /**
   * Returns the list of cafeterias on campus as an object.
   */
  cafeterias() {
    return _.map(cafeterias, cafe => ({ label: cafe }));
  },
});

Template.Add_Request_Page.events({
  'submit .request-form'(event, instance) {
    event.preventDefault();

    const first = event.target.first.value;
    const last = event.target.last.value;
    const dorm = event.target.dorm.value;
    const room = event.target.room.value;
    const phone = event.target.phone.value;
    const requestedFoods = instance.$('select[name=requestedFoods]').dropdown('get value');
    requestedFoods.pop();
    const fulfilled = false;

    const newRequestData = { first, last, dorm, room, phone, requestedFoods, fulfilled };

    instance.context.resetValidation();
    RequestsSchema.clean(newRequestData);
    if (instance.context.isValid()) {
      Requests.insert(newRequestData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('View_All_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'click .radio.checkbox'(event, instance) {
    event.preventDefault();
    instance.cafeSelected.set($('input[name=cafe]:checked').val());
  },
});
