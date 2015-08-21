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
        <DefaultRoute handler={Home} />
        <Route name='stop' path='/stop/:stopID' handler={MovementList} />
    </Route>
);

Router.run(routes, Router.HashLocation, (Root, state) => {
    React.render(<Root />, document.querySelector('#react'));

    if (state.params.hasOwnProperty('stopID')) {
        App.actions.changeStop(state.params.stopID);
    }
});
