import React, { PureComponent } from 'react';
import { Input, Form } from '../UI/form';
import { required, isEqualTo, isNumber, minLength, maxLength } from '../validate';

class BasicForm extends PureComponent {
    state = {
        name: '',
        age: '',
        password: '',
        conformPassword: '',
        isValid: false,
        showErrors: false,
    }

    onChange = this.onChange.bind(this);
    onChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('Submitting form');
    }


    render() {
        const { name, age, password, conformPassword, isValid, showErrors } = this.state;

        return (
            <div>
                <Form
                    onSubmit={this.onSubmit.bind(this)}
                    isValid={ isValid }
                    onValidate={(isValid) => this.setState({isValid})}
                    showErrors={ showErrors }
                >
                    <Input
                        label="Name*"
                        name="name"
                        value={name}
                        onChange={this.onChange}
                        validate={[
                            required(),
                            minLength(5),
                            maxLength(25) ]}
                    />

                    <Input
                        label="Age"
                        name="age"
                        value={age}
                        onChange={this.onChange}
                        validate={ isNumber() }
                    />

                    <Input
                        label="Password*"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        validate={ [required()] }
                    />
                    <Input
                        label="Conform Password*"
                        name="conformPassword"
                        value={conformPassword}
                        onChange={this.onChange}
                        validate={ [required('Please conform your password'), isEqualTo(password)] }
                    />

                    <button disabled={!isValid} type="submit">Submit</button>
                </Form>

                <Form>

                </Form>
            </div>
        );
    }
}

export default BasicForm;