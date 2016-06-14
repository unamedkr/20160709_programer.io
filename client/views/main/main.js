var whichByKeyup = 0;

Template.main.onCreated(function() {
  this.subscribe('users');
  this.subscribe('channels');
});

Template.main.onRendered(function() {

});

Template.main.helpers({
  channels: function() {
    return Channel.find({type: 'POST'}, {sort: {createdAt: -1}});
  },

  email: function() {
    return Meteor.user().emails[0].address
  }

});

Template.main.events({

  'click #postCreateBtn': function (e, t) {
    e.preventDefault();
    var post = {
      type: 'POST',
      owner: Meteor.user(),
      text: $('#post-create-textarea').val(),
      createdAt: new Date(),
    }

    $('#post-create-textarea').val('')
    Channel.insert(post)

  },

  'click #postCreateForm': function (e, t) {
    e.preventDefault();
    if(Meteor.userId()) {

    } else {
      $('#signModal').modal('show');
    }

  },

  'click #logout': function (e, t) {
    e.preventDefault();
    Meteor.logout();
  },

  'keydown #post-create-textarea': function(e, t) {
    whichByKeyup = e.which
  },

  'keyup #post-create-textarea': function (e, t) {
    e.preventDefault();

    if(e.which == 16 && whichByKeyup == 13) {
      var post = {
        type: 'POST',
        owner: Meteor.user(),
        text: $('#post-create-textarea').val(),
        createdAt: new Date(),
      }

      $('#post-create-textarea').val('')
      Channel.insert(post)
    }

    var text = $('#post-create-textarea').val()
    if(text) {
      $('#postCreateBtn').removeAttr('disabled');
    } else {
      $('#postCreateBtn').attr('disabled', 'disabled');
    }

    e.target.style.height = "1px";
    e.target.style.height = (20 + e.target.scrollHeight)+"px";
  },

});




/********************************************
* private functions
*********************************************/
