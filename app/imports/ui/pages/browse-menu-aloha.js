import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

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
      "Sunday": instance.haleAlohaMenu.get().Sunday.Dinner,
      "Monday": instance.haleAlohaMenu.get().Monday.Dinner,
      "Tuesday": instance.haleAlohaMenu.get().Sunday.Dinner,
      "Wednesday": instance.haleAlohaMenu.get().Wednesday.Dinner,
      "Thursday": instance.haleAlohaMenu.get().Thursday.Dinner,
      "Friday": instance.haleAlohaMenu.get().Friday.Dinner,
      "Saturday": instance.haleAlohaMenu.get().Saturday.Dinner,
    };

    console.log(data[tab]);
    return { contentType: tab, items: data[tab] };
  },
});

Template.Browse_Menu_Aloha.events({
  'click .item a'(event, template) {
    console.log('clicked');
    const currentTab = $(event.target).closest('a');

    currentTab.addClass('active');
    $('.item a').not(currentTab).removeClass('active');

    template.currentTab.set(currentTab.data('template'));
  },
});

