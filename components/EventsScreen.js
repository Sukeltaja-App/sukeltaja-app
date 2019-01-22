import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import styles from './stylesGlobal';

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

class EventsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }

  navigate = (value) => this.props.navigation.navigate(value);
  handlePress = () => this.setState({ counter: this.state.counter + 1 })

  eventsButton = () => this.handlePress()
  postsButton = () => this.handlePress()
  usersButton = () => this.handlePress()
  mapButton = () => this.handlePress()

  render() {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/1/15/Diving_stage.jpg'

    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri }}style={styles.imgBackground} >

          <Text style={styles.h1}>Tapahtumat</Text>
          <Text>Counter: {this.state.counter}</Text>
          <TouchableOpacity onPress={this.eventsButton} style={styles.button} >
            <Text style={styles.buttonText}>Selaa</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.postsButton} style={styles.button} >
            <Text style={styles.buttonText}>Luo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.usersButton} style={styles.button} >
              <Text style={styles.buttonText}>Liity</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.mapButton} style={stylesLocal.roundButton} >
            <Text style={styles.buttonText}>Aloita</Text>
          </TouchableOpacity>

        </ImageBackground>
      </View>
    )
  }
}

export default EventsScreen