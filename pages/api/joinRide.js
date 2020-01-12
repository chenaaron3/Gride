var firebase = require("firebase/app");
require("firebase/firestore");
import { main_loop } from '../../public/createRoute.js'


var database = firebase.firestore()

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs',
    Promise: Promise
  });

async function joinRide(req, res) {
    console.log("Request body", req.body)
    let data = {
        ride_id: req.body.ride_id,
        name: req.body.name,
        phone: req.body.phone,
        pickup_addr: req.body.pickup_addr
    }
    console.log(data)
    await googleMapsClient.geocode({ address: data.pickup_addr }).asPromise()
    .then((response) => {
        data["coor"] = {
            lat: response.json.results[0].geometry.location.lat,
            long: response.json.results[0].geometry.location.lng
        }
    }).catch((err) => {
        console.log(err);
    });
    console.log(data);
    var passenger_addr = [];
    
    await db.collection('rides').doc(data.ride_id).collection("passengers").add(data)
    .then((doc) => {}).catch((err) => {
        console.log("error: ", err)
    });

    await db.collection('rides').doc(data.ride_id).collection("passengers").get()
    .then((querySnap) => {
        querySnap.forEach( function(doc) {
            passenger_addr.push(doc.pickup_addr);
        });
    }).catch((err) => {
        console.log("error: ", err);
    });

    let new_data = {
        link: await main_loop(data.start_addr, data.dest_addr, passenger_addr)
    }
    
    await db.collection('rides').doc(data.ride_id).set(new_data)
    .then((doc) => {}).catch((err) => {
        console.log("error: ", err);
    });


    res.end("You Have Been Added!");
}

export default joinRide;
