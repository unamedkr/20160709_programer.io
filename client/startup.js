
Template.body.helpers({
  createChart: function () {
    log('Highcharts', Highcharts);
    if(Highcharts) {
      log('Highcharts', Highcharts);
    }
    var tasksData = [{
        y: 1,
        name: 'Incomplete'
      },{
        y: 100,
        name: 'Complete'
      }];
    Meteor.defer(function() {
      Highcharts.chart('chart', {
        series: [{
          type: 'pie',
          data: tasksData
        }]
      });
    });
  }
});



loadGoogleMaps = function() {
  GoogleMaps.load({v: '3'});
  // GoogleMaps.load({v: '3', key: 'AIzaSyASknnWthmBRsV_UB16MX0fHeuf6jcCHzY'});
}

Meteor.startup(function() {
  log('startup..');

  loadGoogleMaps();
})
