import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Entry from './Entry';

class App extends Component {
    render() {
        return (
            <Provider>
                <HashRouter basename={process.env.BASE_NAME}>
                    <Route component={Entry} />
                </HashRouter>
            </Provider>
        );
    }
}

export default hot(module)(App);
