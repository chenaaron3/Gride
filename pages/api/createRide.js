// // Firebase App (the core Firebase SDK) is always required and
// // must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// // Add the Firebase products that you want to use
// // require("firebase/auth");
require("firebase/firestore");

var database = firebase.firestore()

async function createRide(req, res) {
    database.collection("rides").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
    res.end("Create Ride API!!");
}

export default createRide;
