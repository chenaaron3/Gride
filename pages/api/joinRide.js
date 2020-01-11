var firebase = require("firebase/app");

require("firebase/firestore");

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
    // let addDoc = db.collection('rides').doc(data.ride_id).collection("passengers").add(data)
    // .then(ref => {
    //     console.log('Added document with ID: ', ref.id);
    // });
    res.end("You Have Been Added!");
}

export default joinRide;
