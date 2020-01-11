import React from 'react';
import Head from 'next/head'
import '../public/css/index.scss'
import LabeledButton from "../public/Components/LabeledButton";
import "../public/firebaseConfig";

class LandingPage extends React.Component
{
    render()
      {
          return (<div className="center-container">
              <Head>
                  <title>Home</title>
                  <link rel="icon" href="/favicon.ico" />
              </Head>

              <div className="banner center-container">
                  <h1>Welcome to Gride!</h1>
                  <h3>Where you find carpool buddies.</h3>
              </div>

              <div className="options center-container card">
                  <p>
                      Are you a
                  </p>
                  <p>
                      ...
                  </p>
                  <div id="buttons">
                      <LabeledButton label="Driver?" txt="Create a Ride" btnhref="/driverForm"/>
                      <LabeledButton label="Passenger?" txt="Join a Ride" btnhref="/searchRides"/>
                  </div>
              </div>
          </div>)
      }
}
export default LandingPage;

