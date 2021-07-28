import { useState } from 'react';

import AuthLayout from '../../../hoc/Auth/AuthLayout/AuthLayout';
import SignupForm from '../../../components/Auth/Signup/SignupForm/SignupForm';

const Signup = () => {
    const [formControls, setFormControls] = useState({
        username: {
            label: 'Username',
            groupConfig: {
                controlId: 'signup-username'
            },
            elementConfig: {
                type: 'text'
            },
            validation: {
                valid: false,
                touched: false,
                conditions: {
                    required: true
                }
            },
            value: ''
        },
        email: {
            label: 'Email',
            fieldText: "We'll never share your email with anyone.",
            groupConfig: {
                controlId: 'signup-email'
            },
            elementConfig: {
                type: 'email'
            },
            validation: {
                valid: false,
                touched: false,
                conditions: {
                    required: true
                }
            },
            value: ''
        },
        password: {
            label: 'Password',
            groupConfig: {
                controlId: 'signup-password'
            },
            elementConfig: {
                type: 'password'
            },
            validation: {
                valid: false,
                touched: false,
                conditions: {
                    required: true,
                    minLength: 8
                }
            },
            value: ''
        },
        passwordConfirmation: {
            label: 'Confirm password',
            groupConfig: {
                controlId: 'signup-password-confirmation'
            },
            elementConfig: {
                type: 'password'
            },
            validation: {
                valid: false,
                touched: false,
                conditions: {
                    required: true,
                    minLength: 8
                }
            },
            value: ''
        }
    });

    const isValid = (value, conditions) => {
        let isValid = true;

        if (conditions.required) isValid = value.trim() !== '' && isValid;

        if (conditions.minLength)
            isValid = value.length >= conditions.minLength && isValid;

        return isValid;
    };

    const inputChangeHandler = (event, elementId) => {
        const updatedFormControls = {
            ...formControls
        };

        updatedFormControls[elementId] = {
            ...updatedFormControls[elementId],
            value: event.target.value,
            validation: {
                ...updatedFormControls[elementId].validation,
                valid: isValid(
                    event.target.value,
                    formControls[elementId].validation.conditions
                ),
                touched: true
            }
        };

        setFormControls(updatedFormControls);
    };

    return (
        <AuthLayout>
            <h2 className='h4'>Signup</h2>
            <SignupForm
                formControls={formControls}
                inputChangeHandler={inputChangeHandler}
            />
        </AuthLayout>
    );
};

export default Signup;
