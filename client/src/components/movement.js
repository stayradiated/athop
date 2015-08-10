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

        return (
            <div className={classes}>
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
                        <Icon id='sign-in' />
                    </div>

                    <div className='expected-time'>
                        <span className='title'>Expected Arrival</span>
                        <span className='time'>
                            {eAT.format('hh:mm:ss')}
                            <span className='ampm'>{eAT.format('a')}</span>
                        </span>
                    </div>

                    <Counter movement={m} />
                </div>
            </div>
        );
    },

});

export default Movement;
