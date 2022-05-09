import { Field, useFormik, FormikProvider } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getUser } from '../../selectors/selectors';
import { login } from '../../store/user/actionUser';
import { Store } from '../../store/Types';
import { UserRequest } from '../../types/User';


export function Login() {
    const [formValues, setFormValues] = useState<UserRequest>({ login: '', password: '' });
    const user = useSelector<Store>(state => getUser(state));
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

    return <>
        News
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} >
                <div className="text-field">
                    <label htmlFor="login" className="text-field__label">Login</label>
                    <Field className="text-field__input" label="Login" type="text"
                        name="login" id="login" onChange={formik.handleChange} value={formik.values.login} onBlur={formik.handleBlur}>
                    </Field>
                    {formik.errors.login && formik.touched.login && <div className="text-field__message">{formik.errors.login}</div>}
                </div>
                <div className="text-field">
                    <label className="text-field__label" htmlFor="password">Password</label>
                    <Field className="text-field__input" label="Password" type="password"
                        onChange={formik.handleChange} value={formik.values.password} name="password" id="password" onBlur={formik.handleBlur}></Field>
                    {formik.errors.password && formik.touched.password && <div className="text-field__message">{formik.errors.password}</div>}
                </div>
                <button type="submit" disabled={!(formik.isValid)}>Submit</button>
            </form>
        </FormikProvider>
        Not Register?<Link to="/signup" >Register</Link>
    </>
}