var query = new ReactiveVar({});
var address = new ReactiveVar("");



var whichByKeyup = 0;
var isFirstLoad = true;
var gmap = {}
var currentPosition = null;
var prevCenterMarker = null;
Template.main.onCreated(function() {
  this.subscribe('users');
  GoogleMaps.ready('mainMap', function(map) {
    // TODO: init
    gmap = map.instance;
    initGMapListener(map.instance);
  });
});

Template.main.onRendered(function() {
});

Template.main.helpers({
  address() {
    return address.get();
  },

  channels() {
    var tQuery = query.get();
    tQuery.type = 'POST';
    return Channel.find(tQuery, {sort: {createdAt: -1}});
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

  'click #postCreateBtn': function (e, t) {
    e.preventDefault();
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

  },

  'click #postCreateForm': function (e, t) {
    e.preventDefault();
    if(Meteor.userId()) {

    } else {
      $('#signModal').modal('show');
    }

  },

  'click #logout': function (e, t) {
    e.preventDefault();
    Meteor.logout();
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
  var latLng = {
    lat: {
      min: bounds.H.H,
      max: bounds.H.j
    },
    lng: {
      min: bounds.j.j,
      max: bounds.j.H
    }
  }

  if(bounds) {
    query.set({
      latitude:   { $gte: latLng.lat.min, $lte: latLng.lat.max},
      longitude:  { $gte: latLng.lng.min, $lte: latLng.lng.max},
    })
  }

  Meteor.subscribe('findMainPosts', query.get())
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
    console.log('tilesloaded');
  });

  gmap.addListener('bounds_changed', function() {
    console.log('bounds_changed');
  });


  findMainPosts(gmap);
  toCurrentPosition(gmap);
  getAddress(gmap);
}
