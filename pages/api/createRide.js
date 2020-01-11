
var firebase = require("firebase/app");

require("firebase/firestore");

var database = firebase.firestore()

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
    for(const property in data)
        console.log(`${property}: ${data[property]}`);
    res.end("Ride Successfully Created!");
}

export default createRide;
