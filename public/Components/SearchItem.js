import React from 'react';
import "./SearchItem.scss"
import Link from 'next/link'

class SearchItem extends React.Component
{
    render() {
        return (
            <Link href={`/resultRides?rideID=IMse8WAwvfJJBhyUz67U`} className="SearchItem">
                <a>
                    <div className="SearchItem">
                        <div className="ItemPrice">
                            ${this.props.data.charge_amt}
                        </div>
                        <div className="ItemLocations">
                            Start: {this.props.data.start_addr} <br/>
                            Destination: {this.props.data.dest_addr}
                        </div>
                        <span className="ItemSpots">

                        </span>
                    </div>
                </a>
            </Link>)
    }
}

export default SearchItem;
