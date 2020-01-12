import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "./MapComponent.scss"
import SearchItem from "./SearchItem";

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
                center={{lat: this.props.data.start_coor.lat, lng: this.props.data.start_coor.long}}
                style={{width: '50vw', height: '60vh', position: 'relative'}}>

            <Marker onClick={this.onMarkerClick}
                    title={this.props.data.start_addr}
                    name={'Starting Location'}
                    position={{lat: this.props.data.start_coor.lat, lng: this.props.data.start_coor.long}}/>
             <Marker onClick={this.onMarkerClick}
                    title={this.props.data.dest_addr}
                    name={'Destination Location'}
                    position={{lat: this.props.data.dest_coor.lat, lng: this.props.data.dest_coor.long}}/>
            <Marker/>
              {this.props.data.passengers.map((data, i) =>{
                  console.log(data);
                  return (<Marker
                      key={i}
                      title={data.name}
                      position={{lat: data.coor.lat, lng: data.coor.long}}
                      icon={{
                          url: `/Emojis/Emoji-${Math.floor(Math.random() * 8 + 1)}.png`,
                          anchor: new google.maps.Point(32,32),
                          scaledSize: new google.maps.Size(64,64)
                      }}/>)})}
          </Map>
        );
      }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs'
  })(MapComponent);
