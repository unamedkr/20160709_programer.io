
Template.sample.onCreated(function() { });

Template.sample.onRendered(function() { });

Template.sample.helpers({
  sample() {
    return 'sample';
  }
});

Template.sample.events({
  'click #sample': function (e) {
    e.preventDefault();
    var code = $('#sample').val();
    log('버턴 클릭됨');
  }
});
