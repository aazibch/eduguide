import classes from './AuthLayout.module.css';

const AuthLayout = (props) => (
    <div
        className={classes['auth-layout'] + ' border rounded p-3 overflow-auto'}
    >
        {props.children}
    </div>
);

export default AuthLayout;
