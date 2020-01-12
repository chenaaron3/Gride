import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "./MapComponent.scss"

class MapComponent extends React.Component
{
    constructor(props) {
        super(props);
    }

    onMarkerClick = () =>{
        console.log("Marker Clicked");
    }

    render() {
        return (
          <Map google={this.props.google}
                zoom={14}
                initialCenter={{lat: this.props.data.start_coor.lat, lng: this.props.data.start_coor.long}}
                style={{width: '50vw', height: '60vh', position: 'relative'}}>

            <Marker onClick={this.onMarkerClick}
                    title={this.props.data.start_addr}
                    name={'Starting Location'}
                    position={{lat: this.props.data.start_coor.lat, lng: this.props.data.start_coor.long}}/>
             <Marker onClick={this.onMarkerClick}
                    title={this.props.data.dest_addr}
                    name={'Destination Location'}
                    position={{lat: this.props.data.dest_coor.lat, lng: this.props.data.dest_coor.long}}/>

              {this.props.data.}
          </Map>
        );
      }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs'
  })(MapComponent);
