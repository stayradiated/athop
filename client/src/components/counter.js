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
        var time = this.calculateTime();

        var minutes = Math.floor(time / 1000 / 60);
        var seconds = Math.floor((time / 1000) % 60);

        return (
            <div className='component--counter'>
                <time>
                    <span className='minutes'>{minutes}</span>
                    <span className='seconds'>{seconds}</span>
                </time>
            </div>
        );
    },

    calculateTime() {
        var movement = this.props.movement;
        var timestamp = movement.get('TimeStamp');

        var diff;
        if (movement.get('Monitored')) {
            diff = movement.get('ExpectedDepartureTime') - timestamp;
        } else {
            diff = movement.get('ActualDepartureTime') - timestamp;
        }

        var now = Date.now();
        diff -= (now - movement.get('TimeStamp'));

        return diff;
    },

});

export default Counter;
