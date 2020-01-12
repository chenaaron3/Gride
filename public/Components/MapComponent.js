import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "./MapComponent.scss"

class MapComponent extends React.Component
{
    constructor(props) {
        super(props);
        console.log(this.props.data,
                    this.props.data)
          
    }

    displayMarkers = () => {
        return (
        <div>
          <Marker position={{
           lat: this.props.data.start_coor.lat,
           lng: this.props.data.start_coor.long
            }}
         />
         <Marker position ={{
             lat: this.props.data.dest_coor.lat,
           lng: this.props.data.dest_coor.long
         }}></Marker>
         </div>
        );
        
    }

    render() {
        return (
            <Map
              google={this.props.google}
              zoom={8}
              initialCenter={this.props.data.start_coor}>
              {this.displayMarkers()}
            </Map>
              
            
        );
      }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs'
  })(MapComponent);
