import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
  },
});

FlowRouter.route('/profile/:username/', {
  name: 'Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Profile_Page' });
  },
});

FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});


FlowRouter.route('/view_all', {
  name: 'View_All_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'View_All_Page' });
  },
});

FlowRouter.route('/add_request', {
  name: 'Add_Request_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Request_Page' });
  },
});

FlowRouter.route('/hale_aloha_menu', {
  name: 'Browse_Menu_Aloha',
  action() {
    BlazeLayout.render('App_Body', { main: 'Browse_Menu_Aloha' });
  },
});


FlowRouter.route('/gateway_menu', {
  name: 'Browse_Menu_Gateway',
  action() {
    BlazeLayout.render('App_Body', { main: 'Browse_Menu_Gateway' });
  },
});

FlowRouter.route('/about', {
  name: 'About_Us_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'About_Us_Page' });
  },
});

FlowRouter.route('/fulfill-request/:_id', {
  name: 'Fulfill_Request_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Fulfill_Request_Page' });
  },
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
