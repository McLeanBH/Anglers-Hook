// app/adapters/users.js //

import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
    return ajax("https://api.parse.com/1/classes/Users/" + id).then(function(user){
      user.id = user.objectId;
      delete user.objectId;
      return user;
    });
  },

  findAll: function(name){
    return ajax("https://api.parse.com/1/classes/Users").then(function(response){
      return response.results.map(function(user){
        user.id = user.objectId;
        delete user.objectId;
        return user;
      });
    });
  },

  findQuery: function(name, query) {
    return ajax("https://api.parse.com/1/classes/Users", {
      data: Ember.$.param({
          where: JSON.stringify(query)
        })
    }).then(function(response){
      return response.results.map(function(user){
        user.id = user.objectId;
        delete user.objectId;
        return user;
      });
    });
  },

  destroy: function(name, record){
    return ajax({
      url: "https://api.parse.com/1/classes/Users/" + record.id,
      type: "DELETE"
    });
  },

  save: function(name, record){
    if(record.id){
      return ajax({
        url: "https://api.parse.com/1/classes/Users/" + record.id,
        type: "PUT",
        data: JSON.stringify(record)
      }).then(function(response){
        response.id = response.ObjectId;
        delete response.objectId;
        return response;
      });
    }else {
      return ajax({
        url: "https://api.parse.com/1/classes/Users",
        type: "POST",
        data: JSON.stringify(record)
      }).then(function(response){
        record.updatedAt = response.updatedAt;
        return record;
      });
    }
  }
});