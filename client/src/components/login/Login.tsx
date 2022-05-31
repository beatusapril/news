import { Field, useFormik, FormikProvider } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getError, getUser } from '../../selectors/selectors';
import { login } from '../../store/user/actionUser';
import { Store } from '../../store/Types';
import { UserRequest } from '../../types/User';
import '../login/Login.css'


export function Login() {
    const [formValues, setFormValues] = useState<UserRequest>({ login: '', password: '' });
    const user = useSelector<Store>(state => getUser(state));
    const error = useSelector<Store, String>(state => getError(state));
    const dispatch = useDispatch();

    const validate = (values: UserRequest) => {
        const errors = { login: '', password: '' };
        if (!values.login) {
            errors.login = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required'
        }
        if (!errors.login && !errors.password){
            return {};
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: formValues,
        validate: validate,
        onSubmit: onSubmit
    });

    function onSubmit(values: UserRequest) {
        setFormValues(values);
        dispatch(login({ password: values.password, login: values.login }))
    };

    if (user) {
        return <Navigate to="/" />
    }

    return <div className='login__wrapper'><div className="login-form">
        <h2 className="header">Sign in to News</h2>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="">
                <div className="form-group">
                    <label htmlFor="login" className="text-field__label">Login</label>
                    <Field className="form-control" label="Login" type="text"
                        name="login" id="login" onChange={formik.handleChange} value={formik.values.login} onBlur={formik.handleBlur}>
                    </Field>
                    {formik.errors.login && formik.touched.login && <div className="invalid-error">{formik.errors.login}</div>}
                </div>
                <div className="form-group">
                    <label className="text-field__label" htmlFor="password">Password</label>
                    <Field className="form-control" label="Password" type="password"
                        onChange={formik.handleChange} value={formik.values.password} name="password" id="password" onBlur={formik.handleBlur}></Field>
                    {formik.errors.password && formik.touched.password && <div className="invalid-error">{formik.errors.password}</div>}
                </div>
                {error && <div className="invalid-error">{error}</div>} 
                <button type="submit" disabled={!(formik.isValid)} className="btn btn-login">Login</button>
            </form>
        </FormikProvider>
        Not Register?<Link to="/signup" >Register</Link>
    </div>
    </div>
}