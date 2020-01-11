import React from 'react';
import Head from 'next/head'
import firebase from '../public/firebaseConfig.js'

class ResultRides extends React.Component
{
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
export default ResultRides;
