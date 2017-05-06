import { Template } from 'meteor/templating';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './home-page.html';

Template.Home_Page.events({
  'click #requestButton'() {
    /*
     * AJAX request time for the food menu, to see what is available at that time
     * make sure input is required for information
     * fix json stringify
     */

    const steps = [
      {
        title: 'Information',
        html: '<p>Please Enter Your Information</p> ' +
            '<input id="swal-input1" class="swal2-input" placeholder="First Name">' +
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
      },
      {
        title: 'Cafeteria',
        html: 'Please select the cafeteria you want to order from',
        input: 'select',
        inputOptions: {
          HA: 'Hale Aloha',
          GW: 'Gateway',
        },
        inputPlaceholder: 'Select cafeteria',
        showCancelButton: true,
        inputValidator(value) {
          return new Promise(function (resolve, reject) {
            if (value) {
              resolve();
            } else {
              reject('Please select a cafeteria!');
            }
          });
        },
      },
      {
        title: 'Food',
        html: '<div class="ui form"</div>' +
            '<div class="field">' +
            '<select multiple="" name="skills" class="ui dropdown">' +
            '<option value=""> Skills </option>' +
            '<option value=""> xd </option>' +
            '<option value=""> lmao </option>' +
            ' </select> ' +
        '</div>' +
        '</div>',
      },
    ]
    ;

    swal.setDefaults({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: true,
      progressSteps: ['1', '2', '3', '4'],
    });

    swal.queue(steps).then(function (result) {
      swal.resetDefaults();
      swal({
        title: 'Confirm Information',
        html: 'Your answers: <pre>' +
            JSON.stringify(result) +
            '</pre>',
        confirmButtonText: 'Create Request',
        showCancelButton: false,
        progressSteps: ['1', '2', '3', '4'],
      }).then(function () {
        swal(
                'Request Received!',
                '<p>Your order has been received!</p>' + '<p>View it in the view requests tab!</p>',
                'success'
            );
      });
      console.log(result);
    }
        , function () {
      swal.resetDefaults();
    });
  },
});
