'use strict';

var { Store, toImmutable } = require('nuclear-js');
var actionTypes = require('../action-types');

function changeStop(state, stopID) {
    return state
        .set('stopID', stopID)
        .set('details', toImmutable({}))
        .set('movements', toImmutable([]));
}

function getStop(state, stop) {
    if (stop == null) {
        return state;
    }
    return state.set('details', toImmutable(stop));
}

function getStopMovements(state, movements) {
    if (movements == null) {
        return state;
    }
    return state.set('movements', toImmutable(movements.map(function (movement) {
        if (movement.Monitored === false) {
            movement.ExpectedArrivalTime = movement.ActualArrivalTime;
            movement.ExpectedDepartureTime = movement.ActualDepartureTime;
        }
        return movement;
    })));
}

const athop = new Store({

    getInitialState() {
        return toImmutable({
            stopID: '',
            details: {},
            movements: [],
        });
    },

    initialize() {
        this.on(actionTypes.changeStop, changeStop);
        this.on(actionTypes.getStop, getStop);
        this.on(actionTypes.getStopMovements, getStopMovements);
    },

});

export default athop;
