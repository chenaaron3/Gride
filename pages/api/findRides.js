// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
require("firebase/firestore");

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs',
    Promise: Promise
  });
  

var database = firebase.firestore()

// query parameters
// time
// Month
// Day
// Year
// Start Address
// Destination Address

  

async function findRides(req, res) {

    var start_lat, start_long, dest_lat, dest_long;
    await googleMapsClient.geocode({ address: req.query.start_addr }).asPromise()
    .then((start_response) => {
        start_lat = start_response.json.results[0].geometry.location.lat;
        start_long = start_response.json.results[0].geometry.location.lng;
    }).catch((err) => {
        console.log(err);
    });

    await googleMapsClient.geocode({ address: req.query.dest_addr }).asPromise()
    .then((response) => {
        dest_lat = response.json.results[0].geometry.location.lat;
        dest_long = response.json.results[0].geometry.location.lng;
    }).catch((err) => {
        console.log(err);
    });
    console.log(start_lat, start_long, dest_lat, dest_long);
    var filterRef = database.collection("rides").where("dep_time", "==", req.query.time)
    .where("year", "==", req.query.year).where("month", "==", req.query.month)
    .where("day", "==", req.query.day);
    console.log("helo");
    firebase.firestore.GeoPoint()
    filterRef = filterRef.where("start_lat", ">=", start_lat - 0.2).where("start_lat", "<=", start_lat + 0.2);
    filterRef = filterRef.where("start_long", ">=", start_long - 0.2).where("start_long", "<=", start_long + 0.2);

    filterRef = filterRef.where("dest_lat", ">=", dest_lat - 0.2).where("dest_lat", "<=", dest_lat + 0.2);
    var results = filterRef.where("dest_long", ">=", dest_long - 0.2).where("dest_long", "<=", dest_long + 0.2);

    results.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
    // database.collection("rides").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //     });
    // });

    res.end("Find Rides API!!");
}

export default findRides;
