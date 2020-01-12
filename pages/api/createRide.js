var firebase = require("firebase/app");
require("firebase/firestore");
import { main_loop } from '../../public/createRoute.js'
var database = firebase.firestore();
import fbinit from '../../public/firebaseConfig.js'
fbinit();


const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs',
    Promise: Promise
  });
  const accountSid = 'AC7e6981ae45b860926601852d37cb118d';
  const authToken = 'bedc213f5f85fe89cfc6162bccbb0c99';

const client = require('twilio')(accountSid, authToken);



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

    data["link"] = await main_loop(data.start_addr, data.dest_addr, []);

    let addDoc = database.collection('rides').add(data)
    .then(ref => {
        console.log('Added document with ID: ', ref.id);
    });

    client.messages
    .create({
        body: "Confirmed, You've successfully created a ride! We'll send you an additional text when someone joins. Happy Driving!",
        from: '+12056513917',
        to: '+' + data.driver_phone
    })
    .then(message => console.log(message.sid));
    res.end("Ride Successfully Created!");
}

export default createRide;
