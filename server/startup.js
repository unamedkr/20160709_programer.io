

/**************************************************
*
***************************************************/
Meteor.startup(function() {

  try {
    SSL('/root/programer.io/private/privkey.pem','/root/programer.io/private/fullchain.pem', 443);
  } catch(e) {
    console.log("error ", e);
  }


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
