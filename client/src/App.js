import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Articles from './containers/Articles/Articles';
import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Signup/Signup';
import Revisions from './containers/Revisions/Revisions';

import * as actions from './store/actions/index';

import './App.css';

const App = (props) => {
    return (
        <Layout>
            <Route exact path='/wiki/:title' component={Articles} />
            <Route path='/wiki/:title/revisions' component={Revisions} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
        </Layout>
    );
};

export default App;
