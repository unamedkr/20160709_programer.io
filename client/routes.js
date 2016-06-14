

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "index"});
  }
});

FlowRouter.route('/main', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "main"});
  }
});

FlowRouter.route('/invite', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "invite"});
  }
});
