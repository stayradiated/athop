'use strict';

import React from 'react';
import { Navigation } from 'react-router';

const TransportInput = React.createClass({
    displayName: 'TransportInput',

    mixins: [Navigation],

    render() {
        return (
            <div className='component--transport-input'>
                <form onSubmit={this.viewStop}>
                    <input ref='input' type='text' />
                    <button>View</button>
                </form>
            </div>
        );
    },

    viewStop(e) {
        e.preventDefault();
        var input = React.findDOMNode(this.refs.input);
        var stopID = input.value;
        this.transitionTo('stop', { stopID });
    },

});

export default TransportInput;
