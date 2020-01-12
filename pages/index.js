import React from 'react';
import Head from 'next/head'
import '../public/css/index.scss'
import LabeledButton from "../public/Components/LabeledButton";
import firebase from '../public/firebaseConfig.js'
firebase();

class LandingPage extends React.Component
{
    render()
      {
          return (<div className="center-container">
              <Head>
                  <title>Home</title>
                  <link rel="icon" href="/favicon.ico" />
              </Head>

              <div className="indexBanner center-container">
                  <h1>Welcome to Gride!</h1>
                  <h3>Where you find carpool buddies.</h3>
              </div>

              <div className="indexOptions center-container card">
                  <p>
                      Are you a
                  </p>
                  <p>
                      ...
                  </p>
                  <div id="buttons">
                      <LabeledButton label="Driver?" txt="Host a Ride" btnhref="/driverForm"/>
                      <LabeledButton label="Passenger?" txt="Join a Ride" btnhref="/searchRides"/>
                  </div>
              </div>
          </div>)
      }
}
export default LandingPage;

