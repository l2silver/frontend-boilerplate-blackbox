
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux-blackbox'
import ReactDOM from 'react-dom'
import React, {Component} from 'react'

import {BlackboxApp, RegularReduxApp} from './containers/App'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {
	render(){
		return <div>
			<BlackboxApp {...this.props} />
			<RegularReduxApp {...this.props} appendMapStateToProps={()=>'not in this app'} />
		</div>
	}
}

const routes = <Route path="/" component={App} />

class Routes extends Component {
	constructor(props, context){
		super(props, context)
		this.createElement = this.createElement.bind(this)
	}
	createElement(RouteHandler, props) {
    	const {blackbox} = this.props
    	return <RouteHandler {...props} blackbox={blackbox} />
	}
	render(){
		return <Router history={history} createElement={this.createElement} routes={routes}>
	</Router>		
	}
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)

