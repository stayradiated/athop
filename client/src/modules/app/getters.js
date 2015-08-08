'use strict';

const movements = ['athop', 'movements'];

const time = [
    movements,
    (movements) => {
        if (movements.size === 0) {
            return 0;
        }

        var movement = movements.first();
        var timestamp = movement.get('TimeStamp');

        var diff;
        if (movement.get('Monitored')) {
            diff = movement.get('ExpectedDepartureTime') - timestamp;
        } else {
            diff = movement.get('ActualDepartureTime') - timestamp;
        }

        return diff;
    } 
];

export default { movements, time };
