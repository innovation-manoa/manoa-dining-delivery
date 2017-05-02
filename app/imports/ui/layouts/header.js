import { Template } from 'meteor/templating';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './header.html';
// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();
});


Template.Header.events({
  'click #edit_profile'() {
    swal({
      title: 'Multiple inputs',
      html:
      '<p>Please Enter Your Information</p> ' +
        '<input id="swal-input1" class="swal2-input" value="DIE" placeholder="First Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Last Name" required>' +
        '<input id="swal-input3" class="swal2-input" placeholder="Dormitory" required>' +
        '<input id="swal-input4" class="swal2-input" placeholder="Room Number" required>' +
        '<input id="swal-input5" class="swal2-input" placeholder="Phone Number" required>',
      preConfirm() {
        return new Promise(function (resolve) {
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
    }).then(function (result) {

      console.log(result[1]);
      swal(
      'Success!',
      '<p> Your profile was updated successfully </p>',
      'success'
      );
    }).catch(swal.noop);
  },
});
