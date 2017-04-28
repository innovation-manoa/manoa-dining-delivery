import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Profiles, ProfilesSchema } from '../../api/profiles/profiles.js';

const displayErrorMessages = 'displayErrorMessages';
const displaySuccessMessage = 'displaySuccessMessage';

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

Template.Profile_Page.onRendered(function onRendered() {
  this.$('.ui.checkbox').checkbox();
  this.$('.dropdown').dropdown();
});

Template.Profile_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(displaySuccessMessage, false);
  this.context = ProfilesSchema.namedContext('Profile_Page');
});

Template.Profile_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
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
  dorms() {
    return _.map(dormsList, (dorm) => ({ label: dorm }));
  },
  profileField(fieldName) {
    const profileData = Profiles.findOne({ username: FlowRouter.getParam('username') });
    return profileData && profileData[fieldName];
  },
  /**
   * Checks if the logged in matches the profile to edit.
   * @returns {boolean}
   */
  isValidUser() {
    return Meteor.user().profile.name === FlowRouter.getParam('username');
  },
});

Template.Profile_Page.events({
  'submit .profile-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username');
    const first = event.target.first.value;
    const last = event.target.last.value;
    const dorm = event.target.dorm.value;
    const room = event.target.room.value;
    const phone = event.target.phone.value;

    const updatedProfileData = { username, first, last, dorm, room, phone };

    instance.context.resetValidation();
    ProfilesSchema.clean(updatedProfileData);
    instance.context.validate(updatedProfileData);

    if (instance.context.isValid()) {
      // Profile does not exist already, so create a new one
      if (!Profiles.findOne({ username: FlowRouter.getParam('username') })) {
        Profiles.insert(updatedProfileData);
      } else {
        // Profile exists already, so update it
        const docId = Profiles.findOne({ username: FlowRouter.getParam('username') })._id;
        Profiles.update(docId, { $set: updatedProfileData });
      }
      instance.messageFlags.set(displaySuccessMessage, true);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
