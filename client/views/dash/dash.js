
Template.dash.onCreated(function() {

});

Template.dash.onRendered(function() {

});

Template.dash.helpers({
  createChart: function () {
    if(typeof Highcharts !== 'undefined') {
      log('test')
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


  }
});

Template.sample.events({

});
