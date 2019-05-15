# Simple React Form Validation

## [Demo](http://form-validator.digital-logic.net/)

Easy to use.
It provides two higher order components which you wrap your input elements and form components around. Validation is automatic, form submission will only be allowed after the form has passed validation.

Optimized for performance:
Component rendering only occurs when necessary, when the validation functions input changes, or a prop on the input element changes, and validation actions do not execute on each keystroke, but wait for a timeout to pass before evaluating the input.

Easily integrates with any UI component library.

Includes a variety of prebuilt validation functions, and a helper function to create your own validators.

## How does it work?

Design your input components
```javascript
function Input({ label, onChange, value, errorMessage, ...props}) {
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
```javascript
function Form(props) {
    return (
        <form {...props} />
    );
}
// make sure to wrap your Form component in the withGroupValidation hoc
export default withGroupValidation(Form);
```

Build your form
```javascript
function BasicForm () {
    const [{ email }, dispatch ] = useReducer(reducer, { email: '' });

    const onChange = useCallback((event) => {
        const { name, value } = event.target;
        dispatch({ type: name, value });
    });

    <Form // Provide an onSubmit function
        // withGroupValidation will execute this function when
        // the form passes validation, or display errors.
        onSubmit={() => console.log('Data Submitted: ', email)}>
        <Input
            label="eMail Address"
            name="email"
            value={email}
            onChange={onChange}
            // Validation function are executed from left to right,
            // the first one to return an error message is the one that is displayed to the user
            validate={[required('Custom error message'), isEmail()]}/>

        <Button type="submit">Submit</Button>
    </Form>
}

function reducer(state, { type, value }) {
    switch(type) {
        case 'email':
            return {
                ...state,
                email: value
            };
        default:
            return state;
    }
}
```