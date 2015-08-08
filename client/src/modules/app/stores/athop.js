'use strict';

var { Store, toImmutable } = require('nuclear-js');
var actionTypes = require('../action-types');

function setMovements(state, movements) {
    return state.set('movements', toImmutable(movements));
}

const athop = new Store({

    getInitialState() {
        return toImmutable({
            movements: [],
        });
    },

    initialize() {
        this.on(actionTypes.setMovements, setMovements);
    },

});

export default athop;
