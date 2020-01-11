
var firebase = require("firebase/app");

require("firebase/firestore");

var database = firebase.firestore()

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs',
    Promise: Promise
  });

async function createRide(req, res) {
    let data = {
        driver_name: req.body.driver_name,
        driver_phone: req.body.driver_phone,
        dep_time: req.body.dep_time,
        month: req.body.month,
        day: req.body.day,
        year: req.body.year,
        start_addr: req.body.start_addr,
        dest_addr: req.body.dest_addr,
        max_passengers: req.body.max_passengers,
        charge_amt: req.body.charge_amt
    }

    await googleMapsClient.geocode({ address: data.start_addr }).asPromise()
    .then((response) => {
        data["start_coor"] = {
            lat: response.json.results[0].geometry.location.lat,
            long: response.json.results[0].geometry.location.lng
        }
    }).catch((err) => {
        console.log(err);
    });
    console.log(data)
    await googleMapsClient.geocode({ address: data.dest_addr }).asPromise()
    .then((response) => {
        data["dest_coor"] = {
            lat: response.json.results[0].geometry.location.lat,
            long: response.json.results[0].geometry.location.lng
        }
    }).catch((err) => {
        console.log(err);
    });
    
    console.log(data);
    res.end("Ride Successfully Created!");
}

export default createRide;
