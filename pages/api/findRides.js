// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

require("firebase/firestore");

var database = firebase.firestore()

async function findRides(req, res) {
    database.collection("rides").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });

    res.end("Find Rides API!!");
}

export default findRides;
