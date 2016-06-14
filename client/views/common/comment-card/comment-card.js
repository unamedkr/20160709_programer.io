
Template.commentCard.onCreated(function() {
  this.isCommentFormActive = new ReactiveVar(false);
});

Template.commentCard.onRendered(function() { });

Template.commentCard.helpers({
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
  },

  isCommentFormActive() {
    return Template.instance().isCommentFormActive.get()
  }

});

Template.commentCard.events({
  'click #likeCommentBtn': function (e) {
    e.preventDefault();
    var code = $('#likeCommentBtn').val();

    Meteor.call('like', this._id)
  },

});
