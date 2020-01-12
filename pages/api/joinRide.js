var firebase = require("firebase/app");
require("firebase/firestore");
import { main_loop } from '../../public/createRoute.js'
import fbinit from '../../public/firebaseConfig.js'
fbinit();

var database = firebase.firestore()
//Outdated Info
//const accountSid = 'AC0ed8fe02013d326857e3742d73ae89d2';
//const authToken = '3c2237dd44198fd206ca3e0531496e02';

//Updated Info
const accountSid = 'AC7e6981ae45b860926601852d37cb118d';
const authToken = 'bedc213f5f85fe89cfc6162bccbb0c99';

const client = require('twilio')(accountSid, authToken);

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs',
    Promise: Promise
  });

async function joinRide(req, res) {
    console.log("Request body", req.body)
    let data = {
        ride_id: req.body.ride_ID,
        name: req.body.passenger_name,
        phone: req.body.passenger_phone,
        pickup_addr: req.body.pickup_addr,
        start_addr: req.body.start_addr,
        dest_addr: req.body.dest_addr
    }
    console.log(data)
    await googleMapsClient.geocode({ address: data.pickup_addr }).asPromise()
    .then((response) => {
        console.log("LATLON RESPONSE!!!!", response);
        data["coor"] = {
            lat: response.json.results[0].geometry.location.lat,
            long: response.json.results[0].geometry.location.lng
        }
    }).catch((err) => {
        console.log(err);
    });
    console.log(data);
    var passenger_addr = [];

    await database.collection('rides').doc(data.ride_id).collection("passengers").add(data)
    .then((doc) => {}).catch((err) => {
        console.log("error: ", err)
    });

    await database.collection('rides').doc(data.ride_id).collection("passengers").get()
    .then((querySnap) => {
        querySnap.forEach( function(doc) {
            passenger_addr.push(doc.data().pickup_addr);
        });
    }).catch((err) => {
        console.log("error: ", err);
    });


    console.log("ADDRESSES#######: " , data.start_addr, data.dest_addr, passenger_addr)
    let new_data = {
        link: await main_loop(data.start_addr, data.dest_addr, passenger_addr)
    }
    console.log(new_data);
    await database.collection('rides').doc(data.ride_id).update(new_data)
    .then(() => {

    }).catch((err) => {

        console.log("error: ", err);
    });

    await database.collection('rides').doc(data.ride_id).get()
    .then((doc) => {
        client.messages
        .create({
            body: data.name + " has joined your ride! Contact them at " + data.phone +
            " to coordinate! Here's the current route link: " + new_data.link,
            from: '+13343263275',
            to: '+' + doc.data().driver_phone,
        })
        .then(message => console.log(message.sid));
    }).catch((err) => {
        console.log("error: ", err);
    });




    res.end("You Have Been Added!");
}

export default joinRide;
