import React, { PureComponent } from 'react';
import { Input, Form} from '../UI/form';
import { required, minLength, maxLength, isEmail, isEqualTo } from '../validate/validators';
import Button from '@material-ui/core/Button';

class BasicForm extends PureComponent {
    state = {
        name: '',
        email: '',
        password: '',
        conformPassword: '',
        isValid: false
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
                    .filter( ([key, value]) => key !== 'isValid' && key !== 'conformPassword')
                    .reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {})
            );
        }
    }

    render() {
        const { name, email, password, conformPassword, isValid } = this.state;

        return (
            <Form
                onSubmit={this.onSubmit}
                onValidate={this.onValidate}
                isValid={isValid}>
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

                <Button
                    style={{ marginTop: '0.5em'}}
                    disabled={!isValid}
                    type="submit"
                    variant="outlined">Submit</Button>
            </Form>
        );
    }


}


export default BasicForm;