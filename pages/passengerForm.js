import React from 'react';
import Head from 'next/head'
import firebase from '../public/firebaseConfig.js'
firebase();

class PassengerForm extends React.Component
{
    render()
    {
        return (<React.Fragment>
            <Head>
                <title>Passenger Form</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>Passenger Form Page!</p>
        </React.Fragment>)
    }
}
export default PassengerForm;

