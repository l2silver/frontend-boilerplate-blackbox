
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux-blackbox'
import ReactDOM from 'react-dom'
import React, {Component} from 'react'

import {BlackboxApp, RegularReduxApp} from './containers/App'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

function notInThisAPP(){
	return 'not in this app';
}

class App extends Component {
	constructor(props, context){
		super(props, context)
	}
	render(){
		return <div>
			<BlackboxApp {...this.props} />
			<RegularReduxApp {...this.props} appendMapStateToProps={notInThisAPP} />
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
    	return <RouteHandler blackbox={blackbox} />
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

