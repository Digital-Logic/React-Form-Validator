# Simple React Form Validation

## [Demo](http://form-validator.digital-logic.net/)

## How does it work?

Design your input component
```
function Input({label, onChange, value, errorMessage, ...props}) {
    return (
        <label className="input-element">{ label }
            <input onChange={ onChange } value={ value } {...props}/>
            <span className="input-error">{ errorMessage }</span>
        </label>
    );
}
// wrap your input component with the withValidate hoc.
export default withValidate(Input);
```
Design your form component and wrap it with the withGroupValidation hoc.
withGroupValidation will recursively search all children within your form component up to a specified search depth (default: 2) - for any components that are wrapped with the withValidation hoc, and manage there state and share that state with you.
```
function Form(props) {
    return (
        <form {...props} />
    );
}
// make sure to wrap your Form component in the withGroupValidation hoc
export default withGroupValidation(Form);
```

Build your form
```
class BasicForm extends Component {
    state = {
        input1: '',
        input2: '',
        isValid: false, // is the form valid?
        showErrors: false // show all errors on the form
    }
    // add normal event handlers
    onChange = ...
    onSubmit = ...

    // update isValid when the forms validation changes
    onValidate = (isValid) => this.setState({isValid})

    render() {
        const { input1, input2, isValid, showErrors } = this.state;
        return (
            <Form
                isValid={isValid}
                onValidate={this.onValidate}
                showErrors={showErrors}
            >
                <Input
                    label="Input1"
                    name="input1"
                    value={input1}
                    onChange={this.onChange}
                    validate={ required() } />

                <Input
                    label="Input2"
                    name="input2"
                    value={input2}
                    onChange={this.onChange}
                    validate={[required(), minLength(5)]}
                />

                <button type="submit">Submit</button>
            </Form>
        );
    }
}
```