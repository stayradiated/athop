'use strict';

import React from 'react';

import TransportInput from './transportInput';

const Home = React.createClass({
    displayName: 'Home',

    render() {
        return (
            <div className='component--home'>
                <h3>Enter Stop ID</h3>
                <TransportInput />
            </div>
        );
    },

});

export default Home;
