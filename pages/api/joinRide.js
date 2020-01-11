var firebase = require("firebase/app");

require("firebase/firestore");

var database = firebase.firestore()

async function joinRide(req, res) {
    res.end("Join Ride API!!");
}

export default joinRide;
