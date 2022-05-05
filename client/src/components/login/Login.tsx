import { Field, useFormik, FormikProvider } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/login/actionLogin';
import { UserRequest } from '../../types/User';


export function Login() {
    const [formValues, setFormValues] = useState<UserRequest>({ login: '', password: '' });
    const dispatch = useDispatch();

    const validate = (values: UserRequest) => {
        const errors = { login: '', password: '' };
        if (!values.login) {
            errors.login = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required'
        }
    }
    const formik = useFormik({
        initialValues: formValues,
        validate: validate,
        onSubmit: onSubmit
    });

    function onSubmit(values: UserRequest) {
        setFormValues(values);
        dispatch(login({password: formValues.password, login: formValues.login}))
    };

    return <>
        News
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} >
                <div className="text-field">
                    <label for="login" className="text-field__label">Login</label>
                    <Field className="text-field__input" label="Login" type="text"
                        name="login" id="login" onChange={formik.handleChange} value={formik.values.login} onBlur={formik.handleBlur}>
                    </Field>
                    {formik.errors.login && formik.touched.login && <div className="text-field__message">{formik.errors.login}</div>}
                </div>
                <div className="text-field">
                    <label className="text-field__label" for="password">Password</label>
                    <Field className="text-field__input" label="Password" type="password"
                        onChange={formik.handleChange} value={formik.values.password} name="password" id="password" onBlur={formik.handleBlur}></Field>
                    {formik.errors.password && formik.touched.password && <div className="text-field__message">{formik.errors.password}</div>}
                </div>
                <button type="submit" disabled={!(formik.isValid)}>Submit</button>
            </form>
        </FormikProvider>
    </>
}