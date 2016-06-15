loadGoogleMaps = function() {
  // GoogleMaps.load({v: '3'});
  GoogleMaps.load({v: '3', key: 'AIzaSyCb41LH81554bC6nlS-QV6D9pfQIQNdUqA'});
}

Meteor.startup(function() {
  log('startup..');
  loadGoogleMaps();
})
