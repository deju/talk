import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import withLoadable from 'utils/withLoadable';
import Footer from 'components/forms/Footer';

import Signup from 'modules/Signup';

const Demo = withLoadable(() => import('../Demo'));

class Entry extends Component {
    render() {
        return (
            <div className="first-app container">
                <Switch>
                    <Route path="/signup" component={Signup} />
                    <Route path="/demo" component={Demo} />
                    <Redirect to="/signup" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Entry;
