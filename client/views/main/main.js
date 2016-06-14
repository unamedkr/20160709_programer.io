var query = new ReactiveVar({type: 'POST'});
var markersArray = [];

Template.main.onCreated(function() {
  this.subscribe('users');
  GoogleMaps.ready('mainMap', function(map) {
    initMarkers(map.instance);
    initGMapListener(map.instance);
  });
});

Template.main.onRendered(function() {

});

Template.main.helpers({
  channels: function() {
    return Channel.find(query.get());
  },

  mapOptions: function() {
    if(GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(37.642443934398, 126.977429352700),
        zoom: 10
      }
    }
  }
});

Template.main.events({
});




/********************************************
* private functions
*********************************************/

function initGMapListener(gmap) {

  gmap.addListener('dragend', function(map) {
    findMainPosts(gmap);
  });

  gmap.addListener('zoom_changed', function() {
    findMainPosts(gmap);
  });


  findMainPosts(gmap);
}

function initMarkers(gmap) {
  Tracker.autorun(function() {
    _.forEach(markersArray, function(marker) {
      marker.setMap(null);
    });
    markersArray = [];

    var markersquery = _.clone(query.get());
    markersquery.type = 'SPOT';
    var channels = Channel.find(markersquery).fetch();

    var idx = 0;
    _.forEach(channels, function(channel) {
      var center = new google.maps.LatLng(channel.latitude, channel.longitude);
      markersArray[idx] = new google.maps.Marker({
        position: center,
        map: gmap
      });

      idx++;
    });
  })
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

  query.set({
    type:       'POST',
    latitude:   { $gte: latLng.lat.min, $lte: latLng.lat.max},
    longitude:  { $gte: latLng.lng.min, $lte: latLng.lng.max},
  })


  Meteor.subscribe('findMainPosts', query.get())

  var markersquery = _.clone(query.get());
  markersquery.type = 'SPOT';
  Meteor.subscribe('findMainSpots', markersquery)
}
