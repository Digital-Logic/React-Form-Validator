import isEmailValidator from 'validator/lib/isEmail';

function required(message = 'This field is required') {
    return function _required(curValue) {
        if (curValue == null || curValue.trim() === '')
            return message;
        else return '';
    };
}

function isEqualTo(value1, message = 'Passwords do not match') {
    return function _isEqualTo(value2) {
        if (value1 !== value2) {
            return message;
        } else return '';
    };
}

function isNumber(message = 'Invalid Number') {
    return function _isNumber(value) {
        if (Number.isNaN( Number(value) )) {
            return message;
        } else return '';
    };
}

function minLength (minValue, message = `Minimum of ${minValue} characters`) {
    return function _minLength(value) {
        if (value == null) return '';
        if (String(value).length < minValue) {
            return message;
        } else return '';
    };
}

function maxLength (maxValue, message = `${maxValue} characters max`) {
    return function _maxLength(value) {
        if (value == null) return '';
        if (String(value).length > maxValue) {
            return message;
        } else return '';
    };
}

function isEmail(message = `Please enter a valid eMail address.`) {
    return function _isEmail(email) {
        if (isEmailValidator(email))
            return '';
        else return message;
    }
}

// todo - isInteger, lessThan, greaterThan

export {
    required,
    isEqualTo,
    isNumber,
    minLength,
    maxLength,
    isEmail
};