loadGoogleMaps = function() {
  GoogleMaps.load({v: '3'});
  // GoogleMaps.load({v: '3', key: 'AIzaSyBzTOuFxTqjDHvrfFrB9kysq_ZjBdr-gE0'});
}

Meteor.startup(function() {
  log('startup..');
  loadGoogleMaps();
})
