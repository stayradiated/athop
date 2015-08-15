'use strict';

import React from 'react';
import moment from 'moment';

const Counter = React.createClass({
    displayName: 'Counter',

    propTypes: {
        movement: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            interval: null,
        };
    },

    componentDidMount() {
        this.setState({
            interval: setInterval(() => {
                this.forceUpdate();
            }, 1000),
        });
    },

    componentWillUnmount() {
        clearInterval(this.state.interval);
    },

    render() {
        var time = this.calculateTime() / 1000;

        var hours   = this.format(time / 60 / 60);
        var minutes = this.format((time / 60) % 60);
        var seconds = this.format(time % 60);

        return (
            <div className='component--counter'>
                <time>
                    <span className='hours'>{hours}</span>
                    <span className='minutes'>{minutes}</span>
                    <span className='seconds'>{seconds}</span>
                </time>
            </div>
        );
    },

    format(n) {
        var s = Math.floor(n).toString();
        if (s.length < 2) {
            s = '0' + s;
        }
        return s;
    },

    calculateTime() {
        var movement = this.props.movement;
        var timestamp = movement.get('TimeStamp');
        var diff = movement.get('ExpectedDepartureTime') - timestamp;

        var now = Date.now();
        diff -= (now - movement.get('TimeStamp'));

        return diff;
    },

});

export default Counter;
