import eventService from '../services/events'

export const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_EVENT': {
      return [ ...state, action.newEvent ]
    }
    case 'UPDATE_EVENT': {
      const id = action.updatedEvent.id

      return state.map(event => event.id !== id ? event : action.updatedEvent)
    }
    case 'INIT_EVENTS':
      return action.events
    default:
      return state
  }
}

export const ongoingEventReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ONGOING_EVENT': {
      return action.ongoingEvent
    }
    default:
      return state
  }
}

export const initializeEvents = () => {
  return async (dispatch) => {
    const events = await eventService.getAll()

    dispatch({
      type: 'INIT_EVENTS',
      events
    })
  }
}

export const startEvent = (event) => {
  return async (dispatch) => {
    const newEvent = await eventService.create(event)

    dispatch({
      type: 'NEW_EVENT',
      newEvent
    })

    dispatch({
      type: 'SET_ONGOING_EVENT',
      ongoingEvent: newEvent
    })
  }
}

export const endEvent = (event) => {
  event.enddate = new Date()

  return async (dispatch) => {
    const updatedEvent = await eventService.update(event.id, event)

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    }),

    dispatch({
      type: 'SET_ONGOING_EVENT',
      ongoingEvent: null
    })
  }
}

export const createEvent = (event) => {

  return async (dispatch) => {
    const newEvent = await eventService.create(event)

    dispatch({
      type: 'NEW_EVENT',
      newEvent
    })

    return newEvent
  }
}

export const updateEvent = (event) => {

  return async (dispatch) => {
    const updatedEvent = await eventService.update(event.id, event)

    dispatch({
      type: 'UPDATE_EVENT',
      updatedEvent
    })

    return updatedEvent
  }
}

export const forgetEvents = () => {
  return (dispatch) => {
    dispatch({
      type: 'INIT_EVENTS',
      events: []
    })

    dispatch({
      type: 'SET_ONGOING_EVENT',
      ongoingEvent: null
    })
  }
}
