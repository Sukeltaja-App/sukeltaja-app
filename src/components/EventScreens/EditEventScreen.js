import React from 'react'
import { connect } from 'react-redux'
import { updateEvent } from '../../reducers/eventReducer'
import { View, ScrollView } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import styles from '../../styles/global'
import colors from '../../styles/colors'
import EventForm from '../simple/EventForm'

class EditEventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()

    const {
      id,
      description,
      startdate,
      enddate,
    } = props.navigation.getParam('item')

    this.state = {
      event: {
        id,
        description,
        startdate: new Date(startdate),
        enddate: new Date(enddate)
      }
    }
  }

  updateButton = async () => {
    const validated = this.ref.current.getValue()
    const { event } = this.state

    if (validated) {
      const updatedEvent = await this.props.updateEvent(event)

      const action = StackActions.reset({
        index: 2,
        actions: [
          NavigationActions.navigate({ routeName: 'EventMenuScreen' }),
          NavigationActions.navigate({ routeName: 'EventListScreen' }),
          NavigationActions.navigate({
            routeName: 'Event',
            params: { item: updatedEvent }
          })
        ]
      })

      this.props.navigation.dispatch(action)
    }
  }

  render() {
    const { event } = this.state

    return (
      <View style={styles.noPadding}>
        <ScrollView>
          <EventForm
            ref={this.ref}
            event={event}
            onFormChange={(event) => this.setState({ event })}
            onButtonPress={this.updateButton}
            buttonStyle={{ backgroundColor: colors.success }}
            buttonTitle='Tallenna muutokset'
          />
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  null,
  { updateEvent }
)(EditEventScreen)
