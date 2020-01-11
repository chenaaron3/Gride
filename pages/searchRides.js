import React from 'react';
import Head from 'next/head'
import '../public/css/searchRides.scss'
const fetch = require('node-fetch');

class SearchRides extends React.Component
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
            dep_time_display: dep_time_display,
            dep_time: time,
            dep_date: yyyy + "-" + mm + "-" + dd,
            month: parseFloat(mm),
            day: parseFloat(dd),
            year: parseFloat(yyyy),
            start_addr: "Events Center, Isla Vista, CA 93117",
            dest_addr: "Bus Loop, Irvine, CA 92612"
        }
    }

    encodeQueryData = (data) => {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    handleSubmit = (event) => {
        var url = '/api/findRides?'
        var params = {time: this.state.dep_time,
                        month: this.state.month,
                        day: this.state.day,
                        year: this.state.year,
                        start_addr: this.state.start_addr,
                        dest_addr: this.state.dest_addr};
        url += this.encodeQueryData(params);

        let comp = this;

        fetch(url, {
            method: 'get' // *GET, POST, PUT, DELETE, etc.
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            comp.setState({data: json});
        });

        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target.name;
        const value = event.target.value;
        if (target === 'dep_time_display') {
            let hours = parseFloat(value.substring(0,2));
            let mins = parseFloat(value.substring(3,5));
            let time = 60 * hours + mins;
            this.setState({dep_time_display: value, dep_time: time});
        }else if (target === 'dep_date') {
            let year = parseFloat(value.substring(0,4));
            let month = parseFloat(value.substring(5,7));
            let day = parseFloat(value.substring(8,10));
            this.setState({dep_date: value, month: month, day: day, year: year});
        }else if (target === 'start_addr') {
            this.setState({start_addr: value});
        }else if (target === 'dest_addr') {
            this.setState({dest_addr: value});
        }
    }

    render()
    {
        return (<React.Fragment>
            <Head>
                <title>Search Rides</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={this.handleSubmit} className="center-container">
                <div className="searchTitle">
                    <h1>Search for a Ride!</h1>
                </div>
                <div className = "searchBox">
                    <div className="searchTime center-container">
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
                    </div>
                    <div className="searchLocation center-container">
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
                    </div>
                </div>
                <div>
                    <div className="input-submit">
                        <input type="submit" className="flashy-link" id="search-form-send" value="Find a Ride!"/>
                    </div>
                </div>
            </form>
            <div className="searchResults">
                {
                    this.state.data && <div>There Is Data!</div>
                }
            </div>
        </React.Fragment>)
    }
}
export default SearchRides;
