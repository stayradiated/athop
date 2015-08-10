'use strict';

import React from 'react';

import flux from '../flux';
import App from '../modules/app';
import Icon from './icon';
import TransportInput from './transportInput';

const Header = React.createClass({
    displayName: 'Header',

    mixins: [flux.ReactMixin],

    getDataBindings() {
        return {
            stopID: App.getters.stopID,
        };
    },

    render() {
        return (
            <header className='component--header'>
                <h1><Icon id='bus' /> Ferry {this.state.stopID}</h1>
                <h3>26 Albert Street</h3>
            </header>
        );
    },

});

export default Header;
