loadGoogleMaps = function() {
  GoogleMaps.load({v: '3'});
  // GoogleMaps.load({v: '3', key: 'AIzaSyASknnWthmBRsV_UB16MX0fHeuf6jcCHzY'});
}

Meteor.startup(function() {
  log('startup..');
  loadGoogleMaps();
})
