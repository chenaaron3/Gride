import React from 'react';
<<<<<<< Updated upstream
import Head from 'next/head'
import firebase from '../public/firebaseConfig.js'
=======
import Head from 'next/head';
import Passenger from './passengerForm.js';
import firebase from '../public/firebaseConfig.js';
>>>>>>> Stashed changes
import "../public/css/resultRides.scss"
import { useRouter } from 'next/router'
const fetch = require('node-fetch');
import MapComponent from '../public/Components/MapComponent'

const ResultRidesRouter = (props) => {
    const router = useRouter();
    return <ResultRides {...props} router={router} />
}

class ResultRides extends React.Component
{
    constructor(props) {
        super(props);
        this.rideID = props.router.query.rideID;
<<<<<<< Updated upstream
=======
        //console.log(props);
        //console.log(this.rideID)
    }
>>>>>>> Stashed changes

        fetch(`/api/getRide?id=${this.rideID}`)
        .then(result =>
        result.json())
        .then(json => {
            console.log(json);
            this.setState({data:json, start_addr:json.start_addr, dest_addr:json.dest_addr});
        }).catch(err => {
            console.log(err);
        });

        this.state = {
            ride_ID:this.rideID,
            passenger_name:"",
            passenger_phone:"",
            pickup_addr:"",
            loading:false
        };
    }

    handleSubmit = (event) => {
        if(this.state.data.passengers.length >= this.state.data.max_passengers)
        {
            alert("This Gride is already full! Please choose another Gride.");
            window.open("/searchRides", "_self");
            event.preventDefault();
            return;
        }
        this.setState({loading: true});
        fetch("/api/joinRide", {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state) // body data type must match "Content-Type" header
        }).then(function(response) {
            return response.text();
        }).then(function(data) {
            window.open("/passengerConfirm", "_self");
        });

        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target.name;
        const value = event.target.value;
        console.log("Setting", target, "to", value);
        console.log("State:", this.state);
        if (target === 'passenger_name') {
            this.setState({passenger_name: value});
        } else if (target === 'passenger_phone') {
            this.setState({passenger_phone: value});
        }else if (target === 'pickup_addr') {
            this.setState({pickup_addr: value});
        }
    }

    render()
    {
        if(!this.state || !this.state.data)
            return <div></div>
        return (<React.Fragment>
            <head>
                <title>Result Rides</title>
<<<<<<< Updated upstream
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {this.state.loading &&
            <div className="sk-cube-grid">
                <div className="sk-cube sk-cube1"></div>
                <div className="sk-cube sk-cube2"></div>
                <div className="sk-cube sk-cube3"></div>
                <div className="sk-cube sk-cube4"></div>
                <div className="sk-cube sk-cube5"></div>
                <div className="sk-cube sk-cube6"></div>
                <div className="sk-cube sk-cube7"></div>
                <div className="sk-cube sk-cube8"></div>
                <div className="sk-cube sk-cube9"></div>
            </div>}
            <div className="resultLeft center-container">
                <div className="resultTopLeft center-container">
                    <p>Driver Details</p>
                    <p>Name: {this.state.data.driver_name}</p>
                    <p>Phone: {this.state.data.driver_phone}</p>
                    <p>Price: ${this.state.data.charge_amt}</p>
                </div>
                <div className="resultBottomLeft">
                    {this.state && this.state.data && <MapComponent data = {this.state.data}/>}
                </div>
            </div>
            <div className="resultRight center-container">
                <div className="resultTopRight center-container">
                    <p>Ride Details</p>
                    <p>Start: {this.state.data.start_addr}</p>
                    <p>Destination: {this.state.data.dest_addr}</p>
                    <p>Booked: {this.state.data.passengers.length} / {this.state.data.max_passengers}</p>
                </div>
                <div className="resultBottomRight">
                    <form onSubmit={this.handleSubmit} className="center-container resultForm">
                        <div className="result-input-field">
                            <input value={this.state.passenger_name} type="text" name="passenger_name"
                                   onChange={this.handleChange} required/>
                            <label>Your Name</label>
                        </div>
                        <div className="result-input-field">
                            <input value={this.state.passenger_phone} type="number" name="passenger_phone"
                                   onChange={this.handleChange} required/>
                            <label>Your Phone</label>
                        </div>
                        <div className="result-input-field">
                            <input value={this.state.pickup_addr} type="text" name="pickup_addr"
                                   onChange={this.handleChange} required/>
                            <label>Pickup Location</label>
                        </div>
                        <div className="result-input-submit">
                            <input type="submit" className="flashy-link" id="result-form-send" value="Join Gride!"/>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>)
=======
            </head>
            <div class="grid2x2">
  <div class="box box1">
      <div class = "top">
          <h1>Driver Details</h1>
      </div>
      <div class = "driver">
        <p>Name:____________<br/><br/>Phone:____________</p>
      </div>
  </div>
  <div class="box box2">
      <div class = "top">
        <h1>Ride Details</h1>
      </div>
      <div class = "ride">
        <p>Start:____________<br/><br/>Destination:_____<br/><br/>Booked:    3/5</p>
      </div>
      <div id="price">
            <p>Price: $5</p>
      </div>
  </div>
  <div class="box box3">
      <div class = "top">
          <h1>Google Maps</h1>
      </div>
      <div id="google maps">
          /*To be implemented*/
      </div>
  </div>
  <div class="box box4">
      <div class = "top">
          <h1>Passenger Information</h1>
      </div>
      <div class = "passenger">
        <p>Name:______________<br/><br/>Phone:______________<br/><br/>Pickup:_____________</p>
      </div>
      <div id="driver">
          <p>Professor Boo</p>
      </div>
  </div>
</div>
            
        </React.Fragment>);
>>>>>>> Stashed changes
    }
}

export default ResultRidesRouter;
