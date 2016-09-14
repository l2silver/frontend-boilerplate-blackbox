
import { handleActions } from 'redux-actions'

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}]

export default handleActions({
  'add todont' (state, action) {
    return [{
      id: state.reduce((maxId, todont) => Math.max(todont.id, maxId), -1) + 1,
      completed: false,
      text: action.payload
    }, ...state]
  },

  'delete todont' (state, action) {
    return state.filter(todont => todont.id !== action.payload )
  },

  'edit todont' (state, action) {
    return state.map(todont => {
      return todont.id === action.payload.id
        ? { ...todont, text: action.payload.text }
        : todont
    })
  },

  'complete todont' (state, action) {
    return state.map(todont => {
      return todont.id === action.payload
        ? { ...todont, completed: !todont.completed }
        : todont
    })
  },

  'complete all' (state, action) {
    const areAllMarked = state.every(todont => todont.completed)
    return state.map(todont => {
      return {
        ...todont,
        completed: !areAllMarked
      }
    })
  },

  'clear complete' (state, action) {
    return state.filter(todont => todont.completed === false)
  }
}, initialState)
