import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('welcome', {path: '/'});
  this.route('login');
  this.route('register');

  this.route('segue', function() {
    this.route('dashboard');
    this.route('species-ref');
    this.route('weather-radar', function() {
      this.route('loading');
    });
    this.route('forum');
  });
  this.route('search');
  this.route('show');
});

export default Router;
