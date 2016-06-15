var query = new ReactiveVar({});

var whichByKeyup = 0;
var isFirstLoad = true;
var gmap = {}
Template.main.onCreated(function() {
  this.subscribe('users');

  GoogleMaps.ready('mainMap', function(map) {
    toCurrentPosition(map.instance)
    // TODO: init
    gmap = map.instance;
    initGMapListener(map.instance);
  });
});

Template.main.onRendered(function() {
});

Template.main.helpers({
  channels() {
    var tQuery = query.get();
    tQuery.type = 'POST';
    return Channel.find(tQuery, {sort: {createdAt: -1}});
  },

  email() {
    return Meteor.user().emails[0].address
  },

  mapOptions() {
    var latLng = Geolocation.latLng();
    if(GoogleMaps.loaded() && latLng) {
      return {
        center: Geolocation.latLng(),
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
    var latLng = Geolocation.latLng();
    var post = {
      type: 'POST',
      owner: Meteor.user(),
      text: $('#post-create-textarea').val(),
      createdAt: new Date(),
    }

    if(latLng) {
      post.latitude = latLng.lat;
      post.longitude = latLng.lng;
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
      var latLng = Geolocation.latLng();
      var post = {
        type: 'POST',
        owner: Meteor.user(),
        text: $('#post-create-textarea').val(),
        createdAt: new Date(),
      }

      if(latLng) {
        post.latitude = latLng.lat;
        post.longitude = latLng.lng;
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

  var latLng = Geolocation.latLng();
  var myloc = new google.maps.Marker({
      clickable: false,
      icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                                                      new google.maps.Size(22,22),
                                                      new google.maps.Point(0,18),
                                                      new google.maps.Point(11,11)),
      position: latLng,
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

  if(latLng) {
    query.set({
      latitude:   { $gte: latLng.lat.min, $lte: latLng.lat.max},
      longitude:  { $gte: latLng.lng.min, $lte: latLng.lng.max},
    })
  }

  Meteor.subscribe('findMainPosts', query.get())
}


/********************************************
* private functions
*********************************************/

function initGMapListener(gmap) {

  gmap.addListener('dragend', function(map) {
    findMainPosts(gmap);
  });

  gmap.addListener('tilesloaded', function(map) {
    console.log('tilesloaded');
  });

  gmap.addListener('bounds_changed', function() {
    console.log('bounds_changed');
  });


  findMainPosts(gmap);
}
