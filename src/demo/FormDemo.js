import React, { PureComponent } from 'react';
import { Input, Form} from '../UI/form';
import { required, minLength, maxLength, isEmail, isEqualTo } from '../validate/validators';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    wrappedComponent: {
        border: "1px solid rgba(255,255,255,0.87)",
        padding: '5px 10px',
        borderRadius: '5px',
        margin: '10px 5px'
    }
});

class BasicForm extends PureComponent {
    state = {
        name: '',
        email: '',
        password: '',
        conformPassword: '',
        wrappedComponent: '',
        optional: '',
        isValid: false,
        formKey: 0 // Used to reset the form
    };

    onInputUpdate = this.onInputUpdate.bind(this);
    onInputUpdate({ target: { name, value } }) {
        this.setState({
            [name]: value
        });
    }

    onValidate = this.onValidate.bind(this);
    onValidate(isValid) {
        if (this.state.isValid !== isValid) {
            this.setState({
                isValid
            });
        }
    }

    onSubmit = this.onSubmit.bind(this);
    onSubmit(event) {
        event.preventDefault();

        if(this.state.isValid) {
            this.props.onSubmit(
                Object.entries(this.state)
                    .filter( ([key, value]) => key !== 'isValid' && key !== 'conformPassword' && key !== 'formKey')
                    .reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {})
            );
        }
    }

    onReset = this.onReset.bind(this);
    onReset() {
        this.setState(state => ({
            name: '',
            email: '',
            password: '',
            conformPassword: '',
            wrappedComponent: '',
            isValid: false,
            formKey: state.formKey + 1
        }));
    }

    render() {
        const { name, email, password, conformPassword, wrappedComponent, optional, isValid, formKey } = this.state;
        const { classes } = this.props;

        return (
            <Form
                onSubmit={this.onSubmit}
                onValidate={this.onValidate}
                isValid={isValid}
                key={formKey}>

                <Input
                    label="Name"
                    name="name"
                    value={name}
                    validate={[required(), minLength(5), maxLength(20)]}
                    onChange={this.onInputUpdate} />
                <Input
                    label="eMail Address"
                    name="email"
                    value={email}
                    validate={[required(), isEmail()]}
                    onChange={this.onInputUpdate} />

                <Input
                    label="Password"
                    name="password"
                    value={password}
                    type="password"
                    validate={[required(), minLength(8), maxLength(20)]}
                    onChange={this.onInputUpdate} />

                <Input
                    label="Conform Password"
                    name="conformPassword"
                    type="password"
                    value={conformPassword}
                    validate={[required(), isEqualTo(password)]}
                    onChange={this.onInputUpdate} />

                <div className={classes.wrappedComponent}>
                    <Input
                        label="Wrapped Component"
                        name="wrappedComponent"
                        value={ wrappedComponent }
                        validate={[required()]}
                        onChange={this.onInputUpdate} />

                    <Input
                        label="Optional Input"
                        name="optional"
                        value={optional}
                        validate={[maxLength(15)]}
                        onChange={this.onInputUpdate} />
                </div>

                <Grid container justify="space-between">
                    <Button
                        style={{ marginTop: '0.5em'}}
                        disabled={!isValid}
                        type="submit"
                        variant="outlined">Submit</Button>

                    <Button
                        style={{ marginTop: '0.5em'}}
                        onClick={this.onReset}
                        variant="outlined">Reset Form</Button>
                </Grid>

            </Form>
        );
    }
}


export default withStyles(styles)(BasicForm);