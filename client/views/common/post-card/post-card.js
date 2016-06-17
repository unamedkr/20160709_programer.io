
Template.postCard.onCreated(function() {
  this.isCommentFormActive = new ReactiveVar(false);
});

Template.postCard.onRendered(function() { });

Template.postCard.helpers({
  comments() {
    return Channel.find({parent: this._id}, {sort: {createdAt: -1}})
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

Template.postCard.events({
  'click #likeBtn': function (e) {
    e.preventDefault();
    var code = $('#likeBtn').val();

    Meteor.call('like', this._id)
  },

  'click #commentBtn': function (e, t) {
    e.preventDefault();

    var isCommentFormActive = t.isCommentFormActive.get();
    if(isCommentFormActive) {
      t.isCommentFormActive.set(false)
    }else {
      t.isCommentFormActive.set(true)
    }
  },

  'keyup [name=commentText]': function (e) {
    e.preventDefault();

    if(e.which == 13) {
      var text = $('#'+this._id).val();

      if(text) {
        var post = {
          name: name,
          latitude: this.latitude,
          longitude: this.longitude
        }

        console.log('post: ', post);


        Meteor.call('comment', this._id, post)
        $('#commentText').val('')
      }
    }
  }
});
