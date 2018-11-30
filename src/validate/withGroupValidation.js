import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

function withGroupValidation (WrappedComponent) {
    class WithGroupValidation extends Component {

        constructor(props) {
            super(props);

            // dynamically create state that matches children components
            this.state =
                Children.map( this.props.children || [] /* removes the need for a null check */,
                    child => {
                        if ('validate' in child.props) {
                            if (child.props.name == undefined)
                                console.log('Error: withGroupValidation: group validation can only be preformed on elements that have a name property.');

                            return child.props.name
                        }
                    })
                    // convert array property names into and object { [name]: true }
                    .reduce( (_state, cur) => {
                        // input element validation state, initially set to true
                        _state[cur] = true;
                        return _state;
                    }, {});
        }

        componentDidMount() {
            this.calIsFormValid();
        }

        componentDidUpdate() {
            this.calIsFormValid();
        }

        calIsFormValid() {
            // has the user provided an onValidate handle?
            if (typeof this.props.onValidate !== 'function') return;
            // this.state is a collection of input elements that are children of this component
            // reduce (this.state) into a true value if every input element isValid,
            // reduce (this.state) into a false value if one or more input elements current state is inValid.
            const isValid =
                Object.values(this.state)
                    .reduce( (isValid, inputIsValid) => {
                        if(!inputIsValid)
                            return false;
                        return isValid;
                    }, true);

            // update parent elements state, if necessary
            if (isValid !== this.props.isValid)
                this.props.onValidate(isValid);
        }

        onInputValidate = this.onInputValidate.bind(this);
        onInputValidate({name, isValid}) {
            this.setState({
                [name]:isValid
            });
        }

        render() {
            const { isValid, children, onValidate, showErrors, ...props } = this.props;

            return (
                <WrappedComponent
                    children={ Children.map(children, child => {
                        if ('validate' in child.props) {
                            return cloneElement( child, {
                                onValidate: this.onInputValidate,
                                showErrors
                            })
                        }
                    })}

                    {...props }
                />
            );
        }
    }

    WithGroupValidation.propTypes = {
        onValidate: PropTypes.func, // function to execute on validation state change
        isValid: PropTypes.bool, // is the form valid
        showErrors: PropTypes.bool // show form errors
    };

    return WithGroupValidation;
}

export default withGroupValidation;