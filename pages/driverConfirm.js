import React from 'react';
import Head from 'next/head';
import LandingPage from './index.js';
import LabeledButton from "../public/Components/LabeledButton";
import "../public/css/driverConfirm.scss";
import firebase from '../public/firebaseConfig.js'

class DriverConfirm extends React.Component
{
    render()
    {
        return (<React.Fragment>
            <head>
                <title>Driver Confirmation</title>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <div class = "Background">
                <div class="Inner">
                    <div class="Header">
                        <h1>Confirmed!</h1>
                    </div>
                    <div class="Message">
                        <p>We'll send you a text with more information</p>
                    </div>
                    <div class="Home">
                     <LabeledButton label="Finished?" txt="Go Home!" btnhref="/"/>
                    </div>
                </div>
            </div>

        </React.Fragment>)
    }
}
export default DriverConfirm;

