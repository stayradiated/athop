'use strict';

var { Store, toImmutable } = require('nuclear-js');
var actionTypes = require('../action-types');

function setStopID(state, stopID) {
    return state.set('stopID', stopID);
}

function setMovements(state, movements) {
    return state.set('movements', toImmutable(movements));
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
