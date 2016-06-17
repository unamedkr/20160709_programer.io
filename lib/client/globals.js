


PostSubs = new SubsManager();

Number.prototype.format = function(){
    if(this==0) return 0;
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
};

T = Template.instance.bind(Template.instance);


loadGoogleMaps = function() {
  // GoogleMaps.load({v: '3'});
  GoogleMaps.load({v: '3', key: 'AIzaSyBzTOuFxTqjDHvrfFrB9kysq_ZjBdr-gE0'});
}


resetLoginUser = function() {
  localStorage.setItem("token", "")
  localStorage.setItem("userId", "")
  localStorage.setItem("userEmail", "")
  localStorage.setItem("userName", "")
  localStorage.setItem("userPhoto", "")
}

setLoginUser = function(data) {
  localStorage.setItem("token", data.token)
  localStorage.setItem("userId", data.user.id)
  localStorage.setItem("userEmail", data.user.email)
  localStorage.setItem("userName", data.user.name)
  localStorage.setItem("userPhoto", data.user.photos[0])
}

getLoginUser = function() {
  return {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    userEmail: localStorage.getItem("userEmail"),
    userName: localStorage.getItem("userName"),
    userPhoto: localStorage.getItem("userPhoto")
  }
}

loginUser = new ReactiveVar(getLoginUser());
