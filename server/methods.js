
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
  },

  address (center) {
    try {
      if(center) {
        var geo = new GeoCoder({language: 'ko'});
        var result = geo.reverse(center.lat, center.lng);

        if(result[0].countryCode == 'KR' || result[0].countryCode == 'KP') {
          return result[0];
        } else {
          var geo = new GeoCoder({language: 'en'});
          var result = geo.reverse(center.lat, center.lng);
          return result[0];
        }

      } else {
        return '';
      }
    } catch(e) {
      console.log('error ', e);
    }

  }
})
