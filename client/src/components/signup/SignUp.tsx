import { Field, useFormik, FormikProvider } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getError, getUser } from '../../selectors/selectors';
import { signUp } from '../../store/signup/actionSignup';
import { Store } from '../../store/Types';
import { UserRequest } from '../../types/User';
import '../signup/SignUp.css'

export function SignUp() {
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
        if (!errors.password && !errors.login){
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
        dispatch(signUp({ password: values.password, login: values.login }))
    };

    if (user) {
        return <Navigate to="/" />
    }

    return <div className='sign-up__wrapper'><div className='login-form'>
        <h2>Sign Up to News</h2>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} >
                <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <Field className="form-control" label="Login" type="text"
                        name="login" id="login" onChange={formik.handleChange} value={formik.values.login} onBlur={formik.handleBlur}>
                    </Field>
                    {formik.errors.login && formik.touched.login && <div className="invalid-error">{formik.errors.login}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field className="form-control" label="Password" type="password"
                        onChange={formik.handleChange} value={formik.values.password} name="password" id="password" onBlur={formik.handleBlur}></Field>
                    {formik.errors.password && formik.touched.password && <div className="invalid-error">{formik.errors.password}</div>}
                </div>
                 {/* {error && <div className="invalid-error">{error}</div>} */}
                <button type="submit" disabled={!(formik.isValid)} className="btn btn-login">Sign up</button>
            </form>
        </FormikProvider>
    </div>
    </div>
}