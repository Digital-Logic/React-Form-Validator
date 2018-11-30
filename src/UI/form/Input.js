import React from 'react';
import PropTypes from 'prop-types';
import withValidate from '../../validate/withValidate';
import "./formElements.css";

function Input({label, onChange, value, errorMessage, ...props}) {
    return (
        <label className="input-element">{ label }
            <input onChange={ onChange } value={ value } {...props}/>
            <span className="input-error">{ errorMessage }</span>
        </label>
    );
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    errorMessage: PropTypes.string
}

export default withValidate(Input);