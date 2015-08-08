'use strict';

import React from 'react';

import flux from '../flux';
import App from '../modules/app';
import Movement from './movement';

const MovementList = React.createClass({
    displayName: 'MovementList',

    mixins: [flux.ReactMixin],

    getDataBindings() {
        return {
            movements: App.getters.movements,
        };
    },

    render() {
        var movements = this.state.movements.map((movement, i) => {
            return <Movement key={i} movement={movement} />
        }).toJS();

        console.log(movements);

        return (
            <div className='component--movement-list'>
                {movements}
            </div>
        );
    },

});

export default MovementList;
