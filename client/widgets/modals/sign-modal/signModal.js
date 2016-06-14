Template.signModal.onCreated(function() {
  this.isLoginPage = new ReactiveVar(true);
});

Template.signModal.helpers({
  isLoginPage: function() {
    return Template.instance().isLoginPage.get();
  }
});

Template.signModal.events({
  'click #toSignupPage': function (event, template) {
    template.isLoginPage.set(false)
  },

  'click #toLoginPage': function (event, template) {
    template.isLoginPage.set(true)
  },


  'click #loginBtn': function (event, template) {
    var user = {
      email: $('#email').val(),
      password: $('#password').val(),
    }

    Meteor.loginWithPassword(user.email, user.password, function(error) {
      console.log('loginWithPassword error', error)
    })

    $('#signModal').modal('hide');
  },

  'click #registerBtn': function (event, template) {

    var user = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
    }

    Accounts.createUser(user, function(error) {
      console.log('createUser error', error)
    });

    $('#signModal').modal('hide');
  },

});
