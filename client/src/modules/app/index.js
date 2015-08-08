import flux from '../../flux';
import actions from './actions';
import getters from './getters';

flux.registerStores({
    athop: require('./stores/athop'),
});

export default { actions, getters };
