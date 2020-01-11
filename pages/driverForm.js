import React from 'react';
import Head from 'next/head'
import '../public/css/driverForm.scss'
const fetch = require('node-fetch');

class DriverForm extends React.Component
{
    constructor(props) {
        super(props);

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        var dep_time_display = today.toTimeString().split(' ')[0].substring(0,5);
        let hours = parseFloat(dep_time_display.substring(0,2));
        let mins = parseFloat(dep_time_display.substring(3,5));
        let time = 60 * hours + mins;

    this.state = {
            driver_name: "Aaron",
            driver_phone: "4084557370",
            dep_time_display: dep_time_display,
            dep_time: time,
            dep_date: yyyy + "-" + mm + "-" + dd,
            month: parseFloat(mm),
            day: parseFloat(dd),
            year: parseFloat(yyyy),
            start_addr: "12316 Scully Ave",
            dest_addr: "636 Stanford Ct",
            max_passengers: 0,
            charge_amt:0
        }
    }

    handleSubmit = (event) => {
        fetch("/api/createRide", {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state) // body data type must match "Content-Type" header
        }).then(function(response) {
            return response.text();
        }).then(function(data) {
            alert(data);
            window.open("/", "_self");
        });

        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target.name;
        const value = event.target.value;
        if (target === 'driver_name') {
            this.setState({driver_name: value});
        } else if (target === 'driver_phone') {
            this.setState({driver_phone: value});
        } else if (target === 'dep_time_display') {
            let hours = parseFloat(value.substring(0,2));
            let mins = parseFloat(value.substring(3,5));
            let time = 60 * hours + mins;
            this.setState({dep_time_display: value, dep_time: time});
        }else if (target === 'dep_date') {
            let year = parseFloat(value.substring(0,4));
            let month = parseFloat(value.substring(5,7));
            let day = parseFloat(value.substring(8,10));
            this.setState({dep_date: value, month: month, day: day, year: year});
        }else if (target === 'month') {
            this.setState({month: value});
        }else if (target === 'day') {
            this.setState({day: value});
        }else if (target === 'year') {
            this.setState({year: value});
        }else if (target === 'start_addr') {
            this.setState({start_addr: value});
        }else if (target === 'dest_addr') {
            this.setState({dest_addr: value});
        }else if (target === 'max_passengers') {
            this.setState({max_passengers: value});
        }else if (target === 'charge_amt') {
            this.setState({charge_amt: value});
        }
    }

    render()
    {
        return (<div className="center-container card container">
            <Head>
                <title>Driver Form</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="driverFormDirections">Fill out this form to create a Ride!</h1>
            <form onSubmit={this.handleSubmit} className="center-container">
                <div className="input-field">
                    <input value={this.state.driver_name} type="text" name="driver_name"
                           onChange={this.handleChange} required/>
                    <label>Name</label>
                </div>
                <div className="input-field">
                    <input value={this.state.driver_phone} type="number" name="driver_phone"
                           onChange={this.handleChange} required/>
                    <label>Phone</label>
                </div>
                <div className="input-field">
                    <input value={this.state.dep_time_display} type="time" name="dep_time_display"
                           onChange={this.handleChange} required/>
                    <label>Departure Time</label>
                </div>
                <div className="input-field">
                    <input value={this.state.dep_date} type="date" name="dep_date"
                           onChange={this.handleChange} required/>
                    <label>Departure Date</label>
                </div>
                <div className="input-field">
                    <input value={this.state.start_addr} type="text" name="start_addr"
                           onChange={this.handleChange} required/>
                    <label>Start Address</label>
                </div>
                <div className="input-field">
                    <input value={this.state.dest_addr} type="text" name="dest_addr"
                           onChange={this.handleChange} required/>
                    <label>Destination Address</label>
                </div>
                <div className="input-field">
                    <input value={this.state.max_passengers} type="number" name="max_passengers"
                           onChange={this.handleChange} required/>
                    <label>Max Passengers</label>
                </div>
                <div className="input-field">
                    <input value={this.state.charge_amt} type="number" name="charge_amt"
                           onChange={this.handleChange} required/>
                    <label>Charge Amount</label>
                </div>
                <div className="input-submit">
                    <input type="submit" className="flashy-link" id="driver-form-send" value="Create Ride!"/>
                </div>
            </form>
        </div>)
    }
}
export default DriverForm;

