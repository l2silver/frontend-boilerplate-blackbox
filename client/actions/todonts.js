
import { createAction } from 'redux-actions'

export const addTodo = createAction('add todont')
export const deleteTodo = createAction('delete todont')
export const editTodo = createAction('edit todont')
export const completeTodo = createAction('complete todont')
export const completeAll = createAction('complete all')
export const clearCompleted = createAction('clear complete')
