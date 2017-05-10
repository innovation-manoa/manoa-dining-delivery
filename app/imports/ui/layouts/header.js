import { Template } from 'meteor/templating';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './header.html';
import { Meteor } from 'meteor/meteor';
import { Profiles, ProfilesSchema } from '../../api/profiles/profiles.js';
import { $ } from 'meteor/jquery';

// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();
  this.$('select.dropdown')
      .dropdown()
  ;
});

Template.Header.events({
  'click #edit_profile'(event) {
    event.preventDefault();
    const data = Profiles.findOne({ username: Meteor.user().profile.name });
    swal({
      title: 'Edit Your Profile ',
      html:
      `<label for="swal-input1"> First Name </label>
        <input id="swal-input1" class="swal2-input" value="${(data && data.first) ? data.first : ''}"
          placeholder="First Name">
      <label for="swal-input2"> Last Name </label>
        <input id="swal-input2" class="swal2-input" value="${(data && data.last) ? data.last : ''}"
          placeholder="Last Name">
      <label for="swal-input3"> Dorm </label>
        <input id="swal-input3" class="swal2-input" value="${(data && data.dorm) ? data.dorm : ''}"
          placeholder="Dorm">
      <label for="swal-input4"> Room Number </label>
        <input id="swal-input4" class="swal2-input" value="${(data && data.room) ? data.room : ''}"
          placeholder="Room Number" required>
      <label for="swal-input5"> Phone Number </label>
        <input id="swal-input5" class="swal2-input" value="${(data && data.phone) ? data.phone : ''}"
          placeholder="Phone Number" required>`,
      confirmButtonColor: '#329900',
      confirmButtonText: 'Update',
      preConfirm() {
        return new Promise(function res(resolve, reject) {
          const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
          // Display an error message if the phone number does not match the regex
          if ($('#swal-input5').val() && !phoneRegex.test($('#swal-input5').val())) {
            reject('You must enter a valid phone number with its area code.');
          }
          resolve([
            $('#swal-input1').val(),
            $('#swal-input2').val(),
            $('#swal-input3').val(),
            $('#swal-input4').val(),
            $('#swal-input5').val(),
          ]);
        });
      },
      onOpen() {
        $('#swal-input1').focus();
      },
    }).then(function updateResult(result) {
      const username = Meteor.user().profile.name;
      const first = result[0];
      const last = result[1];
      const dorm = result[2];
      const room = result[3];
      const phone = result[4];

      const updatedProfileData = { username, first, last, dorm, room, phone };
      ProfilesSchema.clean(updatedProfileData);

      if (!Profiles.findOne({ username: Meteor.user().profile.name })) {
        Profiles.insert(updatedProfileData);
      } else {
        // Profile exists already, so update it
        const docId = Profiles.findOne({ username: Meteor.user().profile.name })._id;
        Profiles.update(docId, { $set: updatedProfileData });
      }
      swal(
      'Success!',
      '<p> Your profile was updated successfully </p>',
      'success'
      );
    }).catch(swal.noop);
  },
});

Template.Header.helpers({
  /**
   * @returns {String} Returns the user who's logged in
   */
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : '';
  },
});
