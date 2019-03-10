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
      _id,
      title,
      description,
      startdate,
      enddate,
    } = props.navigation.getParam('item')

    this.state = {
      event: {
        _id,
        title,
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

      const navigateAction = (routeName, params) => NavigationActions.navigate({
        routeName, params
      })

      const resetAction = StackActions.reset({
        index: 2,
        actions: [
          navigateAction('EventMenuScreen'),
          navigateAction('EventListScreen'),
          navigateAction('Event', { item: updatedEvent })
        ]
      })

      this.props.navigation.dispatch(resetAction)
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
