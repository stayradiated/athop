import reqwest from 'reqwest';

import flux from '../../flux';
import actionTypes from './action-types'
import getters from './getters';

const setStopID = function (stopID) {
    flux.dispatch(actionTypes.setStopID, stopID);
}

const loadStop = function (stopID) {
    reqwest({
        url: '/stop/' + stopID.toString(),
    }).then((movements) => {
        flux.dispatch(actionTypes.setMovements, movements);
    });
};

export default { loadStop, setStopID };
