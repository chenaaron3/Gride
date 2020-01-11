import React from 'react';
import Head from 'next/head'
import firebase from '../public/firebaseConfig.js'
import { useRouter } from 'next/router'

const ResultRidesRouter = (props) => {
    const router = useRouter();
    return <ResultRides {...props} router={router} />
}


class ResultRides extends React.Component
{
    constructor(props) {
        super(props);
        this.rideID = props.router.query.rideID;
    }

    componentDidMount(){
        fetch(`/api/getRide?id=${this.rideID}`)
            .then(result =>
            result.json())
            .then(json =>
                console.log(json));
    }

    render()
    {
        return (<React.Fragment>
            <Head>
                <title>Result Rides</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>Result Rides Page!</p>
        </React.Fragment>)
    }
}

export default ResultRidesRouter;
