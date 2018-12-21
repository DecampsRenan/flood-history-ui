import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, VideoOverlay } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

//import Viewer from './Viewer'

class FloodHistoryMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resourceToShow: null,
      isMarkerShown: true,
      markers: [],
      lat: 49.606059,
      lng: 0.901217,
      zoom: 11,
    }
  }

  componentWillMount = () => {
    fetch('http://localhost:9000/resources', {
      method: 'GET'
    }).then((res) => {
      return res.json()
    }).then((resources) => {
      this.setState({
        markers: resources
      })
    })
  }

  handleMarkerClick = (marker) => {
    this.setState({ resourceToShow: marker })
  }

  hideViewer = () => {
    this.setState({ resourceToShow: null })
  }
  
  render = () => {
    const position = [this.state.lat, this.state.lng]

    return (
      <Map center={position} zoom={this.state.zoom} styles={{height: "100%"}}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <VideoOverlay
          bounds={[[32, -130], [13, -100]]}
          play={this.state.play}
          url="https://www.mapbox.com/bites/00188/patricia_nasa.webm"
        />
      </Map>
    )
  }
}

export default FloodHistoryMap