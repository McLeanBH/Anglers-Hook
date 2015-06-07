// // ( app/components/google-map.js ) //
//
// import Ember from 'ember';
//
// export default Ember.Component.extend({
//     insertMap: function() {
//       var container = this.$('.map-canvas')[0];
//         var options = {
//             center: new window.google.maps.LatLng(
//                 this.get('latitude'),
//                 this.get('longitude'),
//                 this.get('cloudLayer')
//             ),
//             zoom: 15
//         };
//         new window.google.maps.Map(container, options);
//     }.on('didInsertElement')
// });
//
//
// // function initialize() {
// // var mapOptions = {
// // zoom: 4,
// // center: new google.maps.LatLng(49.265984,-123.127491)
// // };
// //
// // var map = new google.maps.Map(document.getElementById('map-canvas'),
// //   mapOptions);
// //
// // var weatherLayer = new google.maps.weather.WeatherLayer({
// // temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
// // });
// // weatherLayer.setMap(map);
// //
// // var cloudLayer = new google.maps.weather.CloudLayer();
// // cloudLayer.setMap(map);
// // google.maps.event.addDomListener(window, 'load', initialize);
// // }
// // });