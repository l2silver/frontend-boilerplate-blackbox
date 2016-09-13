
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect as filterConnect } from 'react-redux-blackbox'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as TodoActions from '../../actions/todos'
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

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export const BlackboxApp = filterConnect(
    [mapStateToProps, ()=>defaultInputs], //this isn't really doing anything, just showing the new format. Factories in this format also work
    mapDispatchToProps,
    null,
    {withRef: true}
  )(App)

export const RegularReduxApp = connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
