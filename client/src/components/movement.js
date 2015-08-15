'use strict';

import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import Icon from './icon';
import Counter from './counter';

const Movement = React.createClass({
    displayName: 'Movement',

    propTypes: {
        movement: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            direction: 0,
        };
    },

    render() {
        var m = this.props.movement;

        var classes = classnames({
            'component--movement': true,
            'monitored': m.get('Monitored'),
            'in-congestion': m.get('InCongestion'),
        });


        var aDT = moment(m.get('ActualDepartureTime'));
        var eAT = moment(m.get('ExpectedArrivalTime'));
        var eDT = moment(m.get('ExpectedDepartureTime'));

        var icon, eTime, title;
        if (this.state.direction  === 0) {
            title = 'Expected Arrival';
            icon = 'sign-in';
            eTime = eAT;
        } else {
            title = 'Expected Departure';
            icon = 'sign-out';
            eTime = eDT;
        }

        return (
            <div className={classes} onClick={this.handleClick}>
                <header>
                    <h1 className='route'>{m.get('Route')}</h1>
                    <p className='departed'>
                        {aDT.format('hh:mm')}
                        <span className='ampm' >{aDT.format('a')}</span>
                    </p>
                    <p className='destination'>
                        <Icon id='arrow-right' />
                        {m.get('DestinationDisplay')}
                    </p>
                </header>

                <div className='details'>
                    <div className='direction'>
                        <Icon id={icon} />
                    </div>

                    <div className='expected-time'>
                        <span className='title'>{title}</span>
                        <span className='time'>
                            {eAT.format('hh:mm:ss')}
                            <span className='ampm'>{eTime.format('a')}</span>
                        </span>
                    </div>

                    <Counter movement={m} />
                </div>
            </div>
        );
    },

    handleClick() {
        this.setState({
            direction: Math.abs(this.state.direction - 1),
        });
    },

});

export default Movement;
