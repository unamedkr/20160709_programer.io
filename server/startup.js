

/**************************************************
*
***************************************************/

Meteor.startup(function() {

  SSLProxy({
     port: 443, //or 443 (normal port/requires sudo)
     ssl : {
          key: Assets.getText("privkey.pem"),
          cert: Assets.getText("fullchain.pem"),

          //Optional CA
          //Assets.getText("ca.pem")
     }
  });


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
