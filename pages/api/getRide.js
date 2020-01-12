var firebase = require("firebase/app");

require("firebase/firestore");

import fbinit from '../../public/firebaseConfig.js'
fbinit();

var database = firebase.firestore()

async function getRide(req, res) {

    //get the ride from the api query id
    database.collection("rides").doc(req.query.id).get().then(function(doc) {
        var ride_data, passengers = [];
        if (doc.exists) {
            var ride_data, passengers = [];
            //get the list of passengers
            doc.ref.collection("passengers").get().then(function (p_list) {
                //add each passenger into list
                p_list.forEach(function(p) {
                    passengers.push(p.data());
                    console.log(p.id, " => ", p.data());
                });

                //append passengers to json object and return
                ride_data = doc.data();
                ride_data["passengers"] = passengers;
                res.status(200).json(ride_data);

            }).catch(function(error) {
                console.log("Error getting document:", error);
                res.status(404).json({
                    status: "ERROR",
                    message: error
                });
            });
        } else {
            res.status(404).json({
                status: "ERROR",
                message: "No such document"
            });
        }

    }).catch(function(error) {
        console.log("Error getting document:", error);
        res.status(404).json({
            status: "ERROR",
            message: error
        });
    });
}

export default getRide;


