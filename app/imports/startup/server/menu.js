/**
 * Created by Terry on 4/19/17.
 */

import { Meteor } from 'meteor/meteor';
const GatewayJSON = JSON.parse(Assets.getText('scrape/gateway_weekly_menu.json'));
const HaleAlohaJSON = JSON.parse(Assets.getText('scrape/hale_weekly_menu.json'));


Meteor.methods({
  getGatewayMenu() {
    return GatewayJSON;
  },
  getHaleAlohaMenu() {
    return HaleAlohaJSON;
  },
});

