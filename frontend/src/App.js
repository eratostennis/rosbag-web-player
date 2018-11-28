import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import NotFound from './Components/NotFound'
import UserPage from './Components/UserPage'
import TodoPage from './Components/TodoPage'
import DashboardPage from './Components/DashboardPage'

export default class App extends React.Component {
  render() {
    const { history } = this.props
    return (
      <BrowserRouter>
        <Router history={history}>
          <Route component={AppRoute} />
        </Router>
      </BrowserRouter>
    )
  }
}

const AppRoute = (props) => (
  <Switch>
    <Route exact path="/user" component={UserPage} />
    <Route path="/todo" component={TodoPage} /> 
    <Route path="/" component={DashboardPage} /> 
    <Route component={NotFound} />
  </Switch>
)
