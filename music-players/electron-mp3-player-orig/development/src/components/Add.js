import React from 'react';
import PropTypes from 'prop-types';

import './css/Add.css';

function Add(props) {
    let { 
        addFunc, 
        buttonClass 
    } = props;

    return (
        <button 
            className={ buttonClass }
            type="button" 
            id="add-button" 
            onClick={ addFunc } 
        >+</button>
    );
}

Add.propTypes = {
    addFunc: PropTypes.func.isRequired,
    buttonClass: PropTypes.string
};

Add.defaultProps = {
    buttonClass: ""
}

export default Add;