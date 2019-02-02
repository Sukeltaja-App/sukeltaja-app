import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../stylesGlobal'
import { createEvent } from '../../reducers/EventReducer'

const stylesLocal = StyleSheet.create({
  roundButton: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#24f30c',
    width: 100,
    height: 100,
    borderRadius: 50
  }
})

class EventScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }

  navigate = (value) => this.props.navigation.navigate(value)

  startButton = async () => {
    const event = { content: 'Uusi tapahtuma 3' }

    await this.props.createEvent(event)

    this.navigate('OngoingEventScreen')
  }
  joinButton = () => {
    console.log(this.props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Tapahtuma</Text>

        <TouchableOpacity onPress={this.joinButton} style={styles.button} >
          <Text style={styles.buttonText}>Liity</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.startButton} style={stylesLocal.roundButton} >
          <Text style={styles.buttonText}>Aloita</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const ConnectedEventScreen = connect(
  null,
  { createEvent }
)(EventScreen)

export default ConnectedEventScreen
