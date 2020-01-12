import React from 'react';
import Head from 'next/head'
import firebase from '../public/firebaseConfig.js'
import { useRouter } from 'next/router'
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
        this.state = {
            start_coor:{},
            dest_coor: {}
        }
    }

    componentDidMount(){
        fetch(`/api/getRide?id=${this.rideID}`)
            .then(result =>
            result.json())
            .then(json =>
                console.log(json)
                // this.setState({start_coor:json.results.start_coor, dest_coor:json.results.dest_coor})
                );
    }

    render()
    {
        return (<React.Fragment>
            <Head>
                <title>Result Rides</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MapComponent start_coor={this.state.start_coor} dest_coor={this.state.dest_coor}/>
            <p>Result Rides Page!</p>
        </React.Fragment>)
    }
}

export default ResultRidesRouter;
