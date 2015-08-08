'use strict';

import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

const Movement = React.createClass({
    displayName: 'Movement',

    propTypes: {
        movement: React.PropTypes.object.isRequired,
    },

    render() {
        var m = this.props.movement;

        var classes = classnames({
            'component--timer': true,
            'monitored': m.get('Monitored'),
            'in-congestion': m.get('InCongestion'),
        });

        return (
            <div className={classes}>
                <h1>{m.get('Route')}</h1>

                <h2>{m.get('Stop')} -> {m.get('DestinationDisplay')}</h2>

                <div className='actual-time'>
                    <p className='arrival'>{moment(m.get('ActualDepartureTime')).format('hh:mm:ss a')}</p>
                    <p className='departed'>{moment(m.get('ActualArrivalTime')).format('hh:mm:ss a')}</p>
                </div>

                <div className='expected-time'>
                    <p className='arrival'>{moment(m.get('ExpectedArrivalTime')).format('hh:mm:ss a')}</p>
                    <p className='departed'>{moment(m.get('ExpectedDepartureTime')).format('hh:mm:ss a')}</p>
                </div>
            </div>
        );
    },

});

export default Movement;
