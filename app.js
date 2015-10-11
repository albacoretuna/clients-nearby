'use strict';

var request = require('request'),
    textFileUrl = 'https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt',
    dublinOffice = {
      latitude: 53.3381985,
      longitude:-6.2592576
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
  /*
   * function distanceCalc
   * Takes a contact, and return the distance between its location to Dublin office.
   */
  function distanceCalc(contact) {

    // earth radius in km
    var R = 6371000;

    // turning all coordinates to radians
    var officeLatitude = dublinOffice.latitude.toRadians();
    var officeLongitude = dublinOffice.longitude.toRadians();
  }

});
