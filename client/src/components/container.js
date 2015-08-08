'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

import Header from './header';

const Container = React.createClass({
    displayName: 'Container',

    render: function () {
        return (
            <div className='component--container'>
                <Header />
                <RouteHandler />
            </div>
        );
    },

});

export default Container;

