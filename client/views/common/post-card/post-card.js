
Template.postCard.onCreated(function() { });

Template.postCard.onRendered(function() { });

Template.postCard.helpers({
  owner() {
    if(this.owner) {
      var oid = new Meteor.Collection.ObjectID(this.owner._str);
      return Channel.findOne(oid);
    } else {
      return {}
    }
  },
  name() {
    return this.owner.username? this.owner.username : this.owner.emails[0].address
  },
  photo() {
    if(this.photos[0]) {
      return this.photos[0];
    } else {
      return "";
    }
  },

  createdAt() {
    return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss');
  }
});

Template.postCard.events({
  'click #sample': function (e) {
    e.preventDefault();
    var code = $('#sample').val();
    log('버턴 클릭됨');
  }
});
