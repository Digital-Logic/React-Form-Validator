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
function BasicForm () {
    const [email, setEmail ] = useState('');

    <Form // Provide an onSubmit function
        // withGroupValidation will execute this function when
        // the form passes validation, or display errors.
        onSubmit={() => console.log('Data Submitted')}>
        <Input
            label="eMail Address"
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            validate={[required()]}/>
        <Button type="submit">Submit</Button>
    </Form>
}
```