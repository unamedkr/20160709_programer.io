
Meteor.methods({
  like (id) {
    if(id) {
      Channel.update(id, {$inc: {likeCount: 1}})
    }
  },

  comment (id, post) {
    post.parent = id;
    post.type = 'COMMENT';
    post.owner = Meteor.user();
    post.createdAt = new Date();

    Channel.insert(post);
    Channel.update(id, {$inc: {commentCount: 1}})
  }
})
