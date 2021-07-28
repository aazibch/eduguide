import { useState } from 'react';

import AuthLayout from '../../../hoc/Auth/AuthLayout/AuthLayout';
import LoginForm from '../../../components/Auth/Login/LoginForm/LoginForm';

const Login = () => {
    const [formControls, setFormControls] = useState({
        email: {
            label: 'Email',
            groupConfig: {
                controlId: 'login-email'
            },
            elementConfig: {
                type: 'email'
            },
            value: '',
            validation: {
                valid: false,
                touched: false,
                conditions: {
                    required: true
                }
            }
        },
        password: {
            label: 'Password',
            groupConfig: {
                controlId: 'login-password'
            },
            elementConfig: {
                type: 'password'
            },
            value: '',
            validation: {
                valid: false,
                touched: false,
                conditions: {
                    required: true,
                    minLength: 8
                }
            }
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
            <h2 className='h4'>Login</h2>
            <LoginForm
                formControls={formControls}
                inputChangeHandler={inputChangeHandler}
            />
        </AuthLayout>
    );
};

export default Login;
