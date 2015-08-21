import reqwest from 'reqwest';

import flux from '../../flux';
import actionTypes from './action-types'
import getters from './getters';

// 30 second timer to keep refreshing the bus stops
var timer = null;

const changeStop = function (stopID) {
    if (timer != null) {
        clearInterval(timer);
    }

    flux.dispatch(actionTypes.changeStop, stopID);

    timer = setInterval(()=> {
        getStopMovements(stopID);
    }, 15 * 1000);

    getStop(stopID);
    getStopMovements(stopID);
}

const getStop = function (stopID) {
    reqwest({
        url: '/stop/' + stopID.toString(),
    }).then((stop) => {
        flux.dispatch(actionTypes.getStop, stop);
    });
};

const getStopMovements = function (stopID) {
    reqwest({
        url: '/stop/' + stopID.toString() + '/movements',
    }).then((movements) => {
        flux.dispatch(actionTypes.getStopMovements, movements);
    });
};

export default { changeStop, getStop, getStopMovements };
