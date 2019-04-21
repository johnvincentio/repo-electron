import React from 'react';
import PropTypes from 'prop-types';

import './css/Add.scss';

function Add(props) {
	const { addFunc, buttonClass } = props;

	return (
		<button className={buttonClass} type="button" id="add-button" onClick={addFunc}>
			+
		</button>
	);
}

Add.propTypes = {
	addFunc: PropTypes.func.isRequired,
	buttonClass: PropTypes.string
};

Add.defaultProps = {
	buttonClass: ''
};

export default Add;
