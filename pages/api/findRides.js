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

function distance(lat1, lon1, lat2, lon2, unit) {
    console.log(lat1, lon1, lat2, lon2)
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

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


    
    var results = {"results": []};

    database.collection("rides").where("dep_time", "==", parseInt(req.query.time))
    .where("year", "==", parseInt(req.query.year)).where("month", "==", parseInt(req.query.month))
    .where("day", "==", parseInt(req.query.day))
    .get().then((querySnapshot) => {
        const promises = [];
        const responses = [];
        querySnapshot.forEach( function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // docs.push(doc);
            var response = doc.data();
            var start_coor = response.start_coor;
            var dest_coor = response.dest_coor;
            response["ride_id"] = doc.id;
            if (distance(start_coor.lat, start_coor.long, start_lat, start_long, "M") < 5 && 
                distance(dest_coor.lat, dest_coor.long, dest_lat, dest_long, "M") < 5) {
                    // results["results"].push(response);    
                    // console.log(response);
                responses.push(response);
                const p = doc.ref.collection("passengers").get().then(snap => {
                    return snap.size;
                });
                promises.push(p);
            }
            
        });
        
        
       return Promise.all(promises).then((sizes) => {
            for (var i = 0; i < sizes.length; i++) {
                responses[i]["num_passengers"] = sizes[i];
            }
            results["results"] = responses;
            console.log("Results: ", results);
            res.status(200).json(results);
       }); 
       //console.log("Results: ", results);
        //res.status(200).json(results);
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
        res.status(404).json({
            status: "ERROR",
            message: error
        });
    });

}

export default findRides;
