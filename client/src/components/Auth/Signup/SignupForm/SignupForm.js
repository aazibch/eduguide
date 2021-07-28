import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignupForm = (props) => {
    const formControls = [];

    for (let control in props.formControls) {
        formControls.push({ ...props.formControls[control], id: control });
    }

    return (
        <Form>
            {formControls.map((control) => (
                <Form.Group key={control.id} {...control.groupConfig}>
                    <Form.Label>{control.label}</Form.Label>
                    <Form.Control
                        onChange={(event) =>
                            props.inputChangeHandler(event, control.id)
                        }
                        value={control.value}
                        isInvalid={
                            !control.validation.valid &&
                            control.validation.touched
                        }
                        {...control.elementConfig}
                    />

                    {control.fieldText ? (
                        <Form.Text className='text-muted'>
                            We'll never share your email with anyone.
                        </Form.Text>
                    ) : null}
                </Form.Group>
            ))}
            <Button
                className='float-right'
                variant='primary'
                size='sm'
                type='submit'
            >
                Signup
            </Button>
        </Form>
    );
};

export default SignupForm;
