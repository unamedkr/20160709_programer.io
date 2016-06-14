var query = new ReactiveVar({type: 'POST'});
var markersArray = [];

Template.main.onCreated(function() {
  this.subscribe('users');
  this.subscribe('channels');
});

Template.main.onRendered(function() {

});

Template.main.helpers({
  channels: function() {
    return Channel.find();
  },

});

Template.main.events({
});




/********************************************
* private functions
*********************************************/
