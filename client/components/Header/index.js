
import React, { Component } from 'react'
import TodoTextInput from '../TodoTextInput'

class Header extends Component {
  handleSave(text) {
    if (text.length) {
      this.props.addTodo(text)
    }
  }

  render() {
    this.callCount ? ++this.callCount : this.callCount = 1
    return (
      <header>
        <h1>{`Call Count: ${this.callCount}`}</h1>
        <TodoTextInput
          newTodo
          onSave={::this.handleSave}
          placeholder="What needs to be done?" />
      </header>
    )
  }
}

export default Header
