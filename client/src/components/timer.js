'use strict';

import React from 'react';
import moment from 'moment';

import flux from '../flux';
import App from '../modules/app';

const Timer = React.createClass({
    displayName: 'Timer',

    mixins: [flux.ReactMixin],

    getDataBindings() {
        return {
            movements: App.getters.movements,
            time: App.getters.time,
        };
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
        var movements = this.state.movements;
        if (movements.size === 0) {
            return null;
        }

        var movement = movements.first();

        var now = Date.now();
        var time = this.state.time;

        var diff = time - (now - movement.get('TimeStamp'));

        var minutes = Math.floor(diff / 1000 / 60);
        var seconds = Math.floor((diff / 1000) % 60);

        return (
            <div className='component--timer'>
                <h2>Route {movement.get('Route')}</h2>

                <div>
                    <label>Monitored</label>
                    <input type='checkbox' disabled checked={movement.get('Monitored')} />
                </div>

                <p>Actual {moment(movement.get('ActualArrivalTime')).format('hh:mm:ss a')}</p>
                <p>Expected {moment(movement.get('ExpectedArrivalTime')).format('hh:mm:ss a')}</p>

                <time>
                    <span className='minutes'>{minutes}</span>
                    <span className='seconds'>{seconds}</span>
                </time>

            </div>
        );
    },

});

export default Timer;
