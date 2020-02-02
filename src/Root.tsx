import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { App, Welcome, SamplesSelect } from './App'

const Root = ({ store }: any) => (
    <Provider store={store}>
        <Router>
            {/* <Route path="/" component={App} /> */}
            <Switch>
                <Route exact path="/">
                    <Welcome />
                </Route>
                <Route exact path="/demos">
                    <SamplesSelect type="demos" />
                </Route>
                <Route exact path="/tests">
                    <SamplesSelect type="tests" />
                </Route>
                <Route path="/:sampleType/:sampleName" component={App} />
                {/* <Route path="/:sampleType/:sampleName/:id" component={App} /> */}
            </Switch>
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root