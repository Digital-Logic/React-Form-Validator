import React, { useReducer } from 'react';
import { Input, Form} from '../UI/form';
import { required, minLength, maxLength, isEmail, isEqualTo } from '../validate/validators';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const ACTIONS = Object.freeze({
    NAME: 'NAME',
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD',
    CONFIRM_PASSWORD: 'CONFIRM_PASSWORD',
    WRAPPED_COMPONENT: 'WRAPPED_COMPONENT',
    OPTIONAL: 'OPTIONAL',
    INCREMENT_KEY: 'INCREMENT_KEY'
});

const styles = theme => ({
    wrappedComponent: {
        border: "1px solid rgba(255,255,255,0.87)",
        padding: '5px 10px',
        borderRadius: '5px',
        margin: '10px 5px'
    }
});

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    wrappedComponent: '',
    optional: '',
    formKey: 0
};

function BasicForm ({ classes, onSubmit }) {
    const [{ name, email, password, confirmPassword, wrappedComponent, optional, formKey }, dispatch ] =
        useReducer( reducer, initialState);

    function onChange(event) {
        const { name, value } = event.target;
        dispatch({ type: name, value });
    }

    function _onSubmit() {
        onSubmit({
            name,
            email,
            password,
            confirmPassword,
            wrappedComponent,
            optional
        });
    }

    return (
        <Form
            onSubmit={_onSubmit}
            key={formKey}>

            <Input
                label="Name"
                name={ACTIONS.NAME}
                value={name}
                validate={[required(), minLength(5), maxLength(20)]}
                onChange={onChange} />
            <Input
                label="eMail Address"
                name={ACTIONS.EMAIL}
                value={email}
                validate={[required(), isEmail()]}
                onChange={onChange} />

            <Input
                label="Password"
                name={ACTIONS.PASSWORD}
                value={password}
                type="password"
                validate={[required(), minLength(8), maxLength(20)]}
                onChange={onChange} />

            <Input
                label="Conform Password"
                name={ACTIONS.CONFIRM_PASSWORD}
                type="password"
                value={confirmPassword}
                validate={[required(), isEqualTo(password)]}
                onChange={onChange} />

            <div className={classes.wrappedComponent}>
                <Input
                    label="Wrapped Component"
                    name={ACTIONS.WRAPPED_COMPONENT}
                    value={ wrappedComponent }
                    validate={[required()]}
                    onChange={onChange} />

                <Input
                    label="Optional Input"
                    name={ACTIONS.OPTIONAL}
                    value={optional}
                    validate={[maxLength(15)]}
                    onChange={onChange} />
            </div>

            <Grid container justify="space-between">
                <Button
                    style={{ marginTop: '0.5em'}}
                    onClick={() => dispatch({ type: ACTIONS.INCREMENT_KEY })}
                    variant="outlined">Reset Form</Button>

                <Button
                    style={{ marginTop: '0.5em'}}
                    type="submit"
                    variant="outlined">Submit</Button>
            </Grid>

        </Form>
    );
}

function reducer(state, { type, value }) {
    switch(type) {
        case ACTIONS.NAME:
            return {
                ...state,
                name: value
            };
        case ACTIONS.EMAIL:
            return {
                ...state,
                email: value
            };
        case ACTIONS.PASSWORD:
            return {
                ...state,
                password: value
            };
        case ACTIONS.CONFIRM_PASSWORD:
            return {
                ...state,
                confirmPassword: value
            };
        case ACTIONS.WRAPPED_COMPONENT:
            return {
                ...state,
                wrappedComponent: value
            };
        case ACTIONS.OPTIONAL:
            return {
                ...state,
                optional: value
            };
        case ACTIONS.INCREMENT_KEY:
            return {
                ...initialState,
                formKey: state.formKey + 1
            };
        default:
            return state;
    }
}


export default withStyles(styles)(BasicForm);