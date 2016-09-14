
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { filterConnect } from 'react-redux-blackbox'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as TodoActions from '../../actions/todos'
import * as TodontActions from '../../actions/todonts'
import style from './style.css'

const defaultInputs = {}

class App extends Component {
  render() {
    const { todos, actions, children, appendMapStateToProps } = this.props
    const lastTodo = appendMapStateToProps('lastTodo', defaultInputs, (state)=>{
      const todosLength = state.todos.length
      return state.todos[todosLength - 1]
    })
    console.log('lastTodo brought to you by appendStateToProps', lastTodo)
    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        {children}
      </div>
    )
  }
}

const mapStateToPropsTodos = createSelector(
  (state)=>state.todos,
  todos=>({todos})
)

function mapDispatchToPropsTodos(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

const mapStateToPropsTodonts = createSelector(
  (state)=>state.todonts,
  todos=>({todos})
)


function mapDispatchToPropsTodonts(dispatch) {
  return {
    actions: bindActionCreators(TodontActions, dispatch)
  }
}

export const BlackboxApp = filterConnect(
    [mapStateToPropsTodos, ()=>defaultInputs],
    mapDispatchToPropsTodos
  )(App)

export const RegularReduxApp = connect(
    mapStateToPropsTodonts,
    mapDispatchToPropsTodonts
  )(App)
