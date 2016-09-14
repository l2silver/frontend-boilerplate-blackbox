
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import todos from './todos'
import todonts from './todonts'

export default combineReducers({
  routing,
  todos,
  todonts
})
