'use strict';

import React from 'react';
import { Navigation } from 'react-router';

import flux from '../flux';
import App from '../modules/app';
import Icon from './icon';
import TransportInput from './transportInput';

const Header = React.createClass({
    displayName: 'Header',

    mixins: [flux.ReactMixin, Navigation],

    getDataBindings() {
        return {
            stopID: App.getters.stopID,
        };
    },

    render() {
        return (
            <header className='component--header'>
                <h1 onClick={this.changeStop}><Icon id='bus' /> Bus Stop {this.state.stopID}</h1>
                <h3>26 Albert Street</h3>
            </header>
        );
    },

    changeStop() {
        this.transitionTo('/');
    }

});

export default Header;
