Template.signModal.onCreated(function() {
  this.isLoginPage = new ReactiveVar(true);
  this.errorLabel = new ReactiveVar(null);
});

Template.signModal.helpers({
  isLoginPage: function() {
    return Template.instance().isLoginPage.get();
  },
  errorLabel: function() {
    return Template.instance().errorLabel.get();
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
      if(error) {
        template.errorLabel.set('login fail - ' + error.reason);
      }else {
        template.errorLabel.set(null);
        $('#signModal').modal('hide');
      }
    })
  },

  'click #registerBtn': function (event, template) {

    var user = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
    }

    Accounts.createUser(user, function(error) {

      if(error) {
        template.errorLabel.set('create fail - ' + error.reason);
      } else {
        sAlert.success('success create user!', {position: 'top', timeout: 4000});
        template.errorLabel.set(null);
        $('#signModal').modal('hide');
      }
    });


  },

});
