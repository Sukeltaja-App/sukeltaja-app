import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import styles from './stylesGlobal';

class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }

  navigate = (value) => this.props.navigation.navigate(value);
  handlePress = () => this.setState({ counter: this.state.counter + 1 })

  eventsButton = () => this.navigate('Events')
  postsButton = () => this.handlePress()
  usersButton = () => this.handlePress()
  mapButton = () => this.handlePress()

  render() {
    const uri = 'https://upload.wikimedia.org/wikipedia/commons/5/50/USS_Scorpion_sail.jpg'
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri }}style={styles.imgBackground} >

          <Text style={styles.h1}>Sukeltaja App</Text>
          <Text>Counter: {this.state.counter}</Text>
          <TouchableOpacity onPress={this.eventsButton} style={styles.button} >
            <Text style={styles.buttonText}>Tapahtumat</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.postsButton} style={styles.button} >
            <Text style={styles.buttonText}>Julkaisut</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.usersButton} style={styles.button} >
              <Text style={styles.buttonText}>Kirjaudu</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.mapButton} style={styles.button} >
            <Text style={styles.buttonText}>Kartta</Text>
          </TouchableOpacity>

        </ImageBackground>
      </View>
    )
  }
}

export default HomeScreen
