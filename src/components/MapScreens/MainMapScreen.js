import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Constants, MapView, Location, Permissions } from 'expo'

import { updateEvent } from '../../reducers/eventReducer'
import { getAll } from '../../reducers/targetReducer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  bc2: {
    width: '40%',
    height: 30
  },
  button: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#50d8ee',
    width: 120,
    height: 30,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20
  }
})

class MainMapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: { latitude: 60.1, longitude: 25.1, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: { coords: { latitude: 60.1, longitude: 25.1 } },
    }
  }

  componentDidMount() {
    this._getLocationAsync()
    this.loadTargets()
  }

  loadTargets = async () => {
    await this.props.getAll()
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      this.setState({
        locationResult: 'Paikannusta ei sallittu.',
        location,
      })
    }

    let location = await Location.getCurrentPositionAsync({})

    this.setState({ locationResult: JSON.stringify(location), location, })
  }

  updateButton = () => {
    this.loadTargets()
  }

  render() {
    const markers = this.props.targets.map(target => {
      return (
        <MapView.Marker
          coordinate={{
            latitude: target.latitude,
            longitude: target.longitude
          }}
          title={target.name}
          description={target.type}
          pinColor='blue'
          key={target.id}
        />
      )
    }) || []

    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', flex:7 }}
          region={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.3688, longitudeDelta: 0.1684
          }}
        >
          <MapView.Marker
            coordinate={this.state.location.coords}
            title="Minä"
            description="Viimeisin sijaintini."
          />

          {markers}

        </MapView>

        <View style={styles.buttonContainer} >
          <View style={styles.bc2} >
            <TouchableOpacity
              style={styles.button}
              onPress={this._getLocationAsync}
            >
              <Text style={styles.buttonText}> Paikanna </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bc2} >
            <TouchableOpacity
              style={styles.button}
              onPress={this.updateButton}
            >
              <Text style={styles.buttonText}> Päivitä </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  targets: state.targets,
  events: state.events,
  ongoingEvent: state.ongoingEvent
})

export default connect(
  mapStateToProps,
  { updateEvent, getAll }
)(MainMapScreen)