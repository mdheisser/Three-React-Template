import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { App, WelcomePage } from './App'

const Root = ({ store }: any) => (
    <Provider store={store}>
        <Router>
            {/* <Route path="/" component={App} /> */}
            <Switch>
                <Route exact path="/">
                    <WelcomePage />
                </Route>
                <Route exact path="/:sampleName" component={App} />
                <Route path="/:sampleName/:id" component={App} />
            </Switch>
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root