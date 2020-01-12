import React from 'react';
import Head from 'next/head';
import '../public/css/searchRides.scss';
const fetch = require('node-fetch');
import SearchItem from "../public/Components/SearchItem";
import firebase from '../public/firebaseConfig.js'
firebase();

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
            start_addr: "",
            dest_addr: "",
            loading:false
        };

        // this.state = {
        //     dep_time_display: dep_time_display,
        //     dep_time: 800,
        //     dep_date: yyyy + "-" + mm + "-" + dd,
        //     month: 1,
        //     day: 12,
        //     year: 2020,
        //     start_addr: "UCSB",
        //     dest_addr: "University of California, Irvine",
        //     loading:false
        // }
    }

    encodeQueryData = (data) => {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    handleSubmit = (event) => {
        this.setState({loading: true});
        var url = '/api/findRides?';
        var params = {time: this.state.dep_time,
                        month: this.state.month,
                        day: this.state.day,
                        year: this.state.year,
                        start_addr: this.state.start_addr,
                        dest_addr: this.state.dest_addr};
        url += this.encodeQueryData(params);

        console.log("Searching at URL", url);

        let comp = this;

        fetch(url, {
            method: 'get' // *GET, POST, PUT, DELETE, etc.
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            comp.setState({loading: false});
            if(json.results.length == 0)
            {
                alert("Sorry! No Rides were found!")
            }
            comp.setState({data: json.results});
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
            <form onSubmit={this.handleSubmit} className="center-container searchRidesForm">
                <div className="searchTitle">
                    <h1>Search for a Ride!</h1>
                </div>
                <div className = "searchBox">
                    <div className="searchTime center-container">
                        <div className="search-input-field">
                            <input value={this.state.dep_time_display} type="time" name="dep_time_display"
                                   onChange={this.handleChange} required/>
                            <label>Departure Time</label>
                        </div>
                        <div className="search-input-field">
                            <input value={this.state.dep_date} type="date" name="dep_date"
                                   onChange={this.handleChange} required/>
                            <label>Departure Date</label>
                        </div>
                    </div>
                    <div className="searchLocation center-container">
                        <div className="search-input-field">
                            <input value={this.state.start_addr} type="text" name="start_addr"
                                   onChange={this.handleChange} required/>
                            <label>Start Address</label>
                        </div>
                        <div className="search-input-field">
                            <input value={this.state.dest_addr} type="text" name="dest_addr"
                                   onChange={this.handleChange} required/>
                            <label>Destination Address</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="search-input-submit center-container">
                        <input type="submit" className="flashy-link" id="search-form-send" value="Find a Ride!"/>
                    </div>
                </div>
            </form>
            <div className="searchResults center-container">
                {
                    this.state.data && this.state.data.map((data, i) =>{
                        console.log(data);
                        return (<SearchItem key={i} data={data}/>)})
                }
            </div>
        </React.Fragment>)
    }
}
export default SearchRides;
