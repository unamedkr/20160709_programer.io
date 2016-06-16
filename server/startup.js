

/**************************************************
*
***************************************************/

Meteor.startup(function() {
  if(Channel.find().count() < 1) {
    var user = {
      type: "POST",
      name: "포스트 내용입니다.",
      createdAt: '2016-06-13',
      owner: {
        name: "홍길동",
        email: "test@test.com",
      }
    }
    Channel.insert(user)
  }
})
