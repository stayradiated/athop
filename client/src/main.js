'use strict';

import $ from 'jquery';
import React from 'react';
import Router from 'react-router';

import flux from './flux';
import App from './modules/app';

import Container from './components/container';
import Home from './components/Home';
import MovementList from './components/movementList';

import './style/index.scss';

// export for http://fb.me/react-devtools
window.React = React;

var { Route, DefaultRoute } = Router;

var routes = (
    <Route path='/' handler={Container}>
        <DefaultRoute path='/' handler={Home} />
        <Route name='stop' path='/stop/:stopID' handler={MovementList} />
    </Route>
);

// 30 second timer to keep refreshing the bus stops
var timer = null;

Router.run(routes, Router.HashLocation, (Root, state) => {
    React.render(<Root />, document.querySelector('#react'));

    if (timer != null) {
        clearInterval(timer);
    }

    if (state.params.hasOwnProperty('stopID')) {
        var stopID = state.params.stopID;
        App.actions.setStopID(stopID);

        timer = setInterval(()=> {
            App.actions.loadStop(stopID);
        }, 30 * 1000);

        App.actions.loadStop(stopID);
    }
});
