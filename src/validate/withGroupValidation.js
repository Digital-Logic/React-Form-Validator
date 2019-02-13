import React, { PureComponent, Children, cloneElement } from 'react';
import { throttle } from './util';
import PropTypes from 'prop-types';

function withGroupValidation (WrappedComponent) {
    class WithGroupValidation extends PureComponent {

        constructor(props) {
            super(props);

            // dynamically create state that matches children components
            this.state =
                Children.map( this.props.children || [] /* removes the need for a null check */,
                    child => {
                        if ('validate' in child.props) {
                            if (child.props.name === undefined)
                                console.log('Error: withGroupValidation: group validation can only be preformed on elements that have a name property.');

                            return child.props.name
                        } else {
                            return child;
                        }
                    })
                    // convert array property names into object key,value pair { [name]: true }
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

        calIsFormValid = throttle(() => {
            // has the user provided an onValidate handle?
            if (typeof this.props.onValidate !== 'function' || this.props.isValid === undefined) return;
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
        }, this.props.validateDelay);

        onInputValidate = this.onInputValidate.bind(this);
        onInputValidate({name, isValid}) {
            this.setState({
                [name]:isValid
            });
        }

        render() {
            const { isValid, children, onValidate, showErrors, validationDelay, ...props } = this.props;

            return (
                <WrappedComponent
                    children={ Children.map(children, child => {
                        if ('validate' in child.props) {
                            return cloneElement( child, {
                                onValidate: this.onInputValidate,
                                showErrors
                            })
                        } else {
                            return child;
                        }
                    })}

                    {...props }
                />
            );
        }

        static get propTypes () {
            return {
                onValidate: function(props, propName, componentName) {
                    if(props[propName]) {
                        if (typeof props[propName] !== 'function')
                        {
                            return new Error(`${propName} can only be a function.`)
                        }
                        if (typeof props.isValid !== 'boolean')
                            return new Error('onValidate requires prop isValid to function correctly.');
                    }
                },
                isValid: PropTypes.bool, // is the form valid
                showErrors: PropTypes.bool, // show form errors
                validationDelay: PropTypes.number.isRequired
            }
        }
        static get defaultProps() {
            return {
                validationDelay: 250
            };
        }
    }

    return WithGroupValidation;
}

export default withGroupValidation;