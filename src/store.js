import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { diveReducer, ongoingDivesReducer } from './reducers/diveReducer'
import { eventReducer, ongoingEventReducer } from './reducers/eventReducer'
import { targetReducer } from './reducers/targetReducer'
import { userReducer, usersReducer } from './reducers/userReducer'
import { messageReducer }from './reducers/messageReducer'
import { reducer as network, createNetworkMiddleware } from 'react-native-offline'

const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 100
})

const appReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  messages: messageReducer,
  ongoingEvent: ongoingEventReducer,
  events: eventReducer,
  ongoingDives: ongoingDivesReducer,
  dives: diveReducer,
  targets: targetReducer,
  network
})

const rootReducer = (state, action) => {
  // When user logs out, clear all app state. Leave only fetched targets.
  if (action.type === 'CLEAR_STATE') {
    state = { targets: state.targets }
  }

  return appReducer(state, action)
}

export const logout = () => {
  return { type: 'CLEAR_STATE' }
}

const store = createStore(
  rootReducer,
  applyMiddleware(networkMiddleware, thunk)
)

export default store
