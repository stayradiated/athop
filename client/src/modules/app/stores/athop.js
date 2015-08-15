'use strict';

var { Store, toImmutable } = require('nuclear-js');
var actionTypes = require('../action-types');

function setStopID(state, stopID) {
    return state.set('stopID', stopID);
}

function setMovements(state, movements) {
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
            movements: [],
        });
    },

    initialize() {
        this.on(actionTypes.setMovements, setMovements);
        this.on(actionTypes.setStopID, setStopID);
    },

});

export default athop;
