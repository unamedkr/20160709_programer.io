
FlowRouter.route('/', {
  action: function() {

    if(isProductionMode() && !isHTTPS()){
      switchHTTPS();
    } else {
      BlazeLayout.render("mainLayout", {content: "index"});
    }
  }
});

FlowRouter.route('/main', {
  action: function() {

    if(isProductionMode() && !isHTTPS()){
      switchHTTPS();
    } else {
      BlazeLayout.render("mainLayout", {content: "main"});
    }
  }
});

FlowRouter.route('/invite', {
  action: function() {
    if(isProductionMode() && !isHTTPS()){
      switchHTTPS();
    } else {
      BlazeLayout.render("mainLayout", {content: "invite"});
    }
  }
});
