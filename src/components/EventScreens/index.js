import { createStackNavigator } from 'react-navigation'

import CreateEventScreen from './EventMenuStack/CreateEventScreen'
import EditEventScreen from './EventMenuStack/EditEventScreen'
import Event from './EventMenuStack/Event'
import EventListScreen from './EventMenuStack/EventListScreen'
import EventMenuScreen from './EventMenuStack/EventMenuScreen'

const EventMenuStack = createStackNavigator({
  EventMenuScreen: {
    screen: EventMenuScreen,
    navigationOptions: {
      headerTitle: 'Tapahtumat'
    }
  },
  EventListScreen: {
    screen: EventListScreen,
    navigationOptions: {
      headerTitle: 'Omat tapahtumat'
    }
  },
  Event: {
    screen: Event,
    navigationOptions: {
      headerTitle: 'Tapahtumasivu'
    }
  },
  EditEventScreen: {
    screen: EditEventScreen,
    navigationOptions: {
      headerTitle: 'Muokkaa tapahtumaa'
    }
  },
  CreateEventScreen: {
    screen: CreateEventScreen,
    navigationOptions: {
      headerTitle: 'Luo tapahtuma'
    }
  }
}, {
  headerBackTitleVisible: false,
  defaultNavigationOptions: {
    headerTitleStyle: {
      flexBasis: '100%'
    }
  }
})

export default EventMenuStack
