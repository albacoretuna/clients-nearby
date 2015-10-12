var ClientsNearby = (function(){
  'use strict';
  var contacts = [],
    dublinOffice = {
      latitude: 53.3381985,
      longitude: -6.2592576
    };
  var request = require('request');
  function getDistanceFromLatLonInKm(lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = toRadians(lat2-dublinOffice.latitude);  // toRadians below
    var dLon = toRadians(lon2-dublinOffice.longitude);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRadians(dublinOffice.latitude)) * Math.cos(toRadians(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  function toRadians(deg) {
    return deg * (Math.PI/180);
  }
  function processClients(contacts) {
    // saving clients living in a 100km radius
    var distanceIncludedClientList =
      contacts.map(client => {
        return {
          latitude: client.latitude,
          longitude: client.longitude,
          user_id: client.user_id,
          name: client.name,
          distance: getDistanceFromLatLonInKm(client.latitude, client.longitude)
        };
      });

    var closeByClients = distanceIncludedClientList.
        filter(client => client.distance <= 100);
    function compareUserID(a,b) {
      if(a.user_id > b.user_id)
        return 1;
      if(a.user_id < b.user_id)
        return -1;
      return 0;
    }
    var closeByClientsSorted = closeByClients.sort(compareUserID);

    report(closeByClientsSorted);
  }
  function report(contacts) {
    console.log('Clients who live max 100 Kms from our office: \n');
    contacts.map(contact => {
      console.log(` id: ${contact.user_id}, Name: ${contact.name}, Distance: ${contact.distance.toFixed(1)}Km`);
    });
  }

  function init() {
    var textFileUrl = 'https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt';

    request.get(textFileUrl, function (error, response, body){
      if (!error && response.statusCode === 200) {
        contacts = body.split('\n');

        contacts = contacts.map(function(elm){
          elm = JSON.parse(elm);
          return elm;
        });
      }
      processClients(contacts);
    });

  }
  return {
    init: init,
    toRadians: toRadians,
    processClients: processClients,
    getDistanceFromLatLonInKm: getDistanceFromLatLonInKm
  };
})();

ClientsNearby.init();
module.exports = ClientsNearby;
