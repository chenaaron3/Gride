import React from 'react';
import Head from 'next/head';
import LandingPage from './index.js';
import LabeledButton from "../public/Components/LabeledButton";
import "../public/css/driverConfirm.scss";
import firebase from '../public/firebaseConfig.js'
firebase();

class DriverConfirm extends React.Component
{
    render()
    {
        return (<React.Fragment>
            <head>
                <title>Driver Confirmation</title>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <div className = "Background">
                <div className="Inner">
                    <div className="Header">
                        <h1>Confirmed!</h1>
                    </div>
                    <div className="Message">
                        <p>We'll send you a text with more information</p>
                    </div>
                    <div className="Home">
                     <LabeledButton label="Finished?" txt="Go Home!" btnhref="/"/>
                    </div>
                </div>
            </div>

        </React.Fragment>)
    }
}
export default DriverConfirm;

