import React, { PureComponent, Children, cloneElement } from 'react';
import { throttle } from './util';
import PropTypes from 'prop-types';

function withGroupValidation (WrappedComponent) {
    class WithGroupValidation extends PureComponent {

        state = {};

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


        // Recursively map children
        mapChildren = this.mapChildren.bind(this);
        mapChildren(children, depth = 0) {

            if (depth < this.props.searchDepth) { // limit search depth

                return Children.map(children, child => {

                    if (React.isValidElement(child)) {
                        if ('validate' in child.props) {
                            return cloneElement(child, {
                                onValidate: this.onInputValidate,
                                showErrors: this.props.showErrors
                            });
                        } else if (child.props.children) {
                            return cloneElement(child, {
                                children: this.mapChildren(child.props.children, depth + 1)
                            });
                        }
                    }
                    return child;
                });
            }
            return children;
        }

        render() {
            const { isValid, children, onValidate, showErrors, validationDelay, searchDepth, ...props } = this.props;

            return (
                <WrappedComponent
                    children={ this.mapChildren(children) }
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
                validationDelay: PropTypes.number.isRequired,
                searchDepth: PropTypes.number.isRequired
            }
        }
        static get defaultProps() {
            return {
                validationDelay: 250,
                searchDepth: 2
            };
        }
    }

    return WithGroupValidation;
}

export default withGroupValidation;