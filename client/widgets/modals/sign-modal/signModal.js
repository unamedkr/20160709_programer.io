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

    Meteor.call('loginApi', user, function(error, data) {
      if(error) {
        template.errorLabel.set('login fail - ' + error.reason);
      } else if(_.isEmpty(data.data)) {
        template.errorLabel.set('login fail - ' + data.message);
      } else {
        setLoginUser(data.data);
        loginUser.set(getLoginUser());
        sAlert.success('login success!', {position: 'top', timeout: 4000});
        template.errorLabel.set(null);
        $('#signModal').modal('hide');
      }

    })
  },

  'click #registerBtn': function (event, template) {

    var user = {
      name: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
    }

    Meteor.call('signupApi', user, function(error, data) {
      if(error) {
        template.errorLabel.set('signup fail - ' + error.reason);
      } else if(_.isEmpty(data.data)) {
        template.errorLabel.set('signup fail - ' + data.message);
      } else {

        setLoginUser(data.data);
        loginUser.set(getLoginUser());
        sAlert.success('signup success!', {position: 'top', timeout: 4000});
        template.errorLabel.set(null);
        $('#signModal').modal('hide');
      }
    })
  },
});
