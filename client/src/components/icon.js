'use strict';

import React from 'react';

const Icon = React.createClass({
    displayName: 'Icon',

    propTypes: {
        id: React.PropTypes.string.isRequired,
    },

    render() {
        var classes = 'icon icon-' + this.props.id;

        return (
            <span className={classes} />
        );
    },

});

export default Icon;
