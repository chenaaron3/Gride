import React from 'react';
import "./SearchItem.scss"
import Link from 'next/link'

class SearchItem extends React.Component
{
    determineColor = () =>{
        let greenStyle = {
            color: 'green'
        };
        let yellowStyle = {
            color: 'yellow'
        };
        let redStyle = {
            color: 'red'
        };
        let taken = this.props.data.num_passengers;
        let total = this.props.data.max_passengers;
        if(taken/total <= .25)
            return greenStyle;
        else if(taken/total <= .75)
            return yellowStyle;
        else
            return redStyle;
    }

    render() {
        return (
            <Link href={`/resultRides?rideID=IMse8WAwvfJJBhyUz67U`}>
                <a className="SearchItem">
                    <div className="SearchItem">
                        <div className="ItemPrice center-container">
                            <p>
                                ${this.props.data.charge_amt}
                            </p>
                        </div>
                        <div className="ItemLocations center-container">
                            <p className="ItemStart">
                                Start: {this.props.data.start_addr} <br/>
                            </p>
                            <p className="ItemDestination">
                                Destination: {this.props.data.dest_addr}
                            </p>
                            <div className="ItemSpots center-container" style={this.determineColor()}>
                                <span>
                                    {this.props.data.num_passengers} / {this.props.data.max_passengers}
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>)
    }
}

export default SearchItem;
