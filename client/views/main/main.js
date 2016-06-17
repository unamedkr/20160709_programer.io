var query = new ReactiveVar({});
var address = new ReactiveVar("");
var width = new ReactiveVar(null);

var mainPosts = new ReactiveVar([]);

var whichByKeyup = 0;
var isFirstLoad = true;
var gmap = {}
var currentPosition = null;
var prevCenterMarker = null;

Template.googleMap.onRendered(function(){
  GoogleMaps.ready('mainMap', function(map) {
    // TODO: init
    gmap = map.instance;
    initGMapListener(map.instance);
  });
})

Template.main.onCreated(function() {
  this.subscribe('users');
});

Template.main.onRendered(function() {
  $(window).resize(function() {
    width.set($(window).width())
  });
});

Template.main.helpers({
  currentUser() {
    return loginUser.get().userId;
  },

  isGeolocation() {
    return Geolocation != null && Geolocation.latLng() != null
  },

  isMobileSize() {
    if(!width.get()) {
      width.set(window.innerWidth || document.body.clientWidth)
    }
    return width.get() < 900;
  },

  address() {
    return address.get();
  },

  channels() {
    return mainPosts.get();
  },

  email() {
    return Meteor.user().emails[0].address
  },

  mapOptions() {
    if(GoogleMaps.loaded()) {
      var center = {};

      if(Geolocation.latLng()) {
        center = Geolocation.latLng();
      } else {
        center = new google.maps.LatLng(37.642443934398, 126.977429352700)
      }

      return {
        center: center,
        zoom: 5,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        scaleControl: false
      }
    }
  }
});

Template.main.events({
  'click #here': function(e, t) {
    gmap.setCenter(Geolocation.latLng())

    if(prevCenterMarker) {
      prevCenterMarker.setMap(null);
    }
    prevCenterMarker = new google.maps.Marker({
        clickable: false,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                                                        new google.maps.Size(22,22),
                                                        new google.maps.Point(0,18),
                                                        new google.maps.Point(11,11)),

        position: Geolocation.latLng(),
        zIndex: 999,
        map: gmap
    });
  },

  'click #postCreateBtn': function (e, t) {
    e.preventDefault();
    var post = {
      type: 'POST',
      owner: loginUser.get().userId,
      name: $('#post-create-textarea').val(),
      createdAt: new Date(),
      latitude: gmap.getCenter().lat(),
      longitude: gmap.getCenter().lng()
    }

    $('#post-create-textarea').val('')

    if(loginUser.get()) {
      Meteor.call('createPostApi', post, loginUser.get().token, function(error, data) {

        if(error) {
          sAlert.error('create fail! - ' + error.reason, {position: 'top', timeout: 4000});
        } else if(_.isEmpty(data.data)) {
          sAlert.error('create fail! - ' + data.message, {position: 'top', timeout: 4000});
        } else {
          var posts = mainPosts.get();
          posts.unshift(data.data)
          mainPosts.set(posts);
        }
      })
    }
  },

  'click #postCreateForm': function (e, t) {
    e.preventDefault();

    if(loginUser.get().token) {

    } else {
      $('#signModal').modal('show');
    }

  },

  'click #logout': function (e, t) {
    e.preventDefault();

    resetLoginUser();
    loginUser.set(getLoginUser());
  },

  'keydown #post-create-textarea': function(e, t) {
    whichByKeyup = e.which
  },

  'keyup #post-create-textarea': function (e, t) {
    e.preventDefault();

    if(e.which == 16 && whichByKeyup == 13) {
      var post = {
        type: 'POST',
        owner: Meteor.user(),
        text: $('#post-create-textarea').val(),
        createdAt: new Date(),
        latitude: gmap.getCenter().lat(),
        longitude: gmap.getCenter().lng()
      }

      $('#post-create-textarea').val('')
      Channel.insert(post)
    }

    var text = $('#post-create-textarea').val()
    if(text) {
      $('#postCreateBtn').removeAttr('disabled');
    } else {
      $('#postCreateBtn').attr('disabled', 'disabled');
    }

    e.target.style.height = "1px";
    e.target.style.height = (20 + e.target.scrollHeight)+"px";
  },

});


function toCurrentPosition(gmap) {
  isFirstLoad = false

  if(prevCenterMarker) {
    prevCenterMarker.setMap(null);
  }

  prevCenterMarker = new google.maps.Marker({
      clickable: false,
      icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                                                      new google.maps.Size(22,22),
                                                      new google.maps.Point(0,18),
                                                      new google.maps.Point(11,11)),

      position: new google.maps.LatLng(gmap.getCenter().lat(), gmap.getCenter().lng()),
      zIndex: 999,
      map: gmap
  });
}

function findMainPosts(gmap) {
  var bounds = gmap.getBounds();
  if(bounds) {
    query.set({
      minLatitude: bounds.H.H,
      maxLatitude: bounds.H.j,
      minLongitude: bounds.j.j,
      maxLongitude: bounds.j.H
    })
  }
  //Meteor.subscribe('findMainPosts', query.get())
  Meteor.call('findMainPostsApi', query.get(), function(error, data) {
    mainPosts.set(data.data)
  })
}


function getAddress(gmap) {
  var center = {
    lat: gmap.getCenter().lat(),
    lng: gmap.getCenter().lng()
  }
  Meteor.call('address', center, function(err, data) {
    if(data && data.formattedAddress) {
      address.set(data.formattedAddress.substr(data.formattedAddress.indexOf(',')+1));
    }
  })
}

/********************************************
* map init functions
*********************************************/

function initGMapListener(gmap) {

  gmap.addListener('dragend', function(map) {
    findMainPosts(gmap);
    toCurrentPosition(gmap);
    getAddress(gmap);
  });

  gmap.addListener('click', function(position) {

    gmap.setCenter(position.latLng);
    findMainPosts(gmap);
    toCurrentPosition(gmap);
    getAddress(gmap);
  });

  gmap.addListener('tilesloaded', function(map) {
  });

  gmap.addListener('bounds_changed', function() {
  });


  findMainPosts(gmap);
  toCurrentPosition(gmap);
  getAddress(gmap);
}
