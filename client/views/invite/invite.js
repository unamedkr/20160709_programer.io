
showUserNumber = function() {
  Meteor.setTimeout(function () {
    Meta.update({_id: 'USER_COUNT'}, {$inc:{value:1}})
    showUserNumber();
  }, Math.floor((Math.random() * 10000)) );
}

Template.invite.onCreated(function() {
  Meteor.subscribe('meta');
});

Template.invite.onRendered(function() {
  showUserNumber();
});

Template.invite.helpers({
  userCount() {
    var meta = Meta.findOne({_id: 'USER_COUNT'});
    return meta? meta.value.format(): 0;
  }
});

Template.invite.events({
  'click #signup-btn': function (e) {
    e.preventDefault();
    log('버턴 클릭됨');
  }
});
