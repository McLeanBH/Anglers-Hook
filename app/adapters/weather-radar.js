import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  findQuery: function(name, query){
    return ajax("http://api.wunderground.com/api/92a39adfcd902ac7/animatedradar/animatedsatellite/conditions/forecast/hourly/rawtide/tide/q/zmw:29401.1.99999.gif.json", {
      dataType: 'jsonp'
    }).then(function(response){
      console.log(response);
      console.log(response.current_observation.temperature_string, 'temp-string');
      console.log(response.current_observation.icon, 'icon');
      console.log(response.current_observation.feelslike_string, 'feels-like');
      console.log(response.current_observation.display_location.full, 'full-location');
      console.log(response.current_observation.display_location.latitude, 'lat');
      console.log(response.current_observation.display_location.longitude, 'long');
      console.log(response.current_observation.weather, 'weather');
      console.log(response.current_observation.wind_dir, 'wind direction');
      console.log(response.current_observation.visibility_mi, 'visibility miles');
      console.log(response.current_observation.wind_string, 'wind');
      console.log(response.forecast);
      console.log(response.hourly_forecast);
      console.log(response.radar);
      console.log(response.rawtide);
      console.log(response.tide);
      console.log(response.response);
      return response;
    });
  }
});
