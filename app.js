'use strict';

var request = require('request'),
    textFileUrl = 'https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt',
    dublinOffice = {
      latitude: 53.3381985,
      longitude: -6.2592576
    };

request.get(textFileUrl, function (error, response, body){
 if (!error && response.statusCode === 200) {
   var textContent = body;
   console.log('body is' + body);
   var contacts = [];
   contacts = body.split('\n');

  contacts = contacts.map(function(elm){
    elm = JSON.parse(elm);
    return elm;

  });

  console.log(contacts);


 }

  function toRadians(degree) {
    return degree * (Math.PI/180);
  }
  /*
   * function distanceCalc
   * Takes a contact, and return the distance between its location to Dublin office.
   */
  function distanceCalc(contact) {
    console.log('before conversion contact.lat is ' + contact.latitude);
    console.log('before conversion contact.lon is ' + contact.longitude);
    console.log('before conversion office.lat is ' + dublinOffice.latitude);
    console.log('before conversion office.lon is ' + dublinOffice.longitude);
    // earth radius in km
    var R = 6371;

    // turning all coordinates to radians
    var officeLatitude = toRadians(dublinOffice.latitude);
    var officeLongitude = toRadians(dublinOffice.longitude);
    var clientLatitude = toRadians(contact.latitude);
    var clientLongitude = toRadians(contact.longitude);
    var deltaLats = clientLatitude - officeLatitude;
    deltaLats = toRadians(deltaLats);
debugger;
    var deltaLongs = clientLongitude - officeLongitude;
     deltaLongs = toRadians(deltaLongs);

/*
 *
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2-lat1);  // deg2rad below
     var dLon = deg2rad(lon2-lon1);
       var a =
               Math.sin(dLat/2) * Math.sin(dLat/2) +
                   Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                       Math.sin(dLon/2) * Math.sin(dLon/2)
                           ;
             var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
               var d = R * c; // Distance in km
             return d;
             }

           function deg2rad(deg) {
             return deg * (Math.PI/180)
             }))))
* */


    var a = Math.sin(deltaLats / 2) * Math.sin(deltaLats / 2) +
            Math.cos(officeLatitude) * Math.cos(clientLatitude) *
            Math.sin(deltaLongs / 2) * Math.sin(deltaLongs / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    console.log('Client Lat is: '+ clientLatitude + '\n' +
              'Client Long is: ' + clientLongitude + '\n' +
              'office lat is: ' + officeLatitude + '\n' +
              'office longitude is: ' + officeLongitude + '\n' +
              'distance is: ' + d);

  }
  distanceCalc(contacts[0]);



});
