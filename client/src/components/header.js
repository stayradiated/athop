'use strict';

import React from 'react';

import TransportInput from './transportInput';

const Header = React.createClass({
    displayName: 'Header',

    render() {
        return (
            <header className='component--header'>
                <h1>Auckland Transport</h1>
                <TransportInput />
            </header>
        );
    },

});

export default Header;
