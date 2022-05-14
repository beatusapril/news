import { Field, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../selectors/selectors";
import { Store } from "../../store/Types";
import { fetchMeAction, meUpdateAction } from "../../store/user/actionUser";
import { UserInfo, UserUpdateRequest } from "../../types/User";
import { fromUser, getEmptyUser } from "../../utils/Utils";
import { Header } from "../header/Header";
import '../profile/Profile.css'

export function Profile() {
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));
    const dispatch = useDispatch();

    const validate = (values: UserUpdateRequest) => {
        const errors = { firstName: '' };
        if (!values.firstName) {
            errors.firstName = 'Required';
        }
        if (!errors.firstName) {
            return {};
        }
        return errors;
    }

    useEffect(() => { formik.setValues(getUserUpdateRequest()) }, [user]);

    function getUserUpdateRequest() {
        if (user) {
            return fromUser(user);
        }
        dispatch(fetchMeAction())
        return getEmptyUser()
    }
    const formik = useFormik({
        initialValues: getUserUpdateRequest(),
        validate: validate,
        onSubmit: onSubmit
    });

    function onSubmit(values: UserUpdateRequest) {
        dispatch(meUpdateAction(values))
    };

    return <>
        <Header />
        {user &&
        <div className="wrapper">
            <div className="profile-card">
                <h2>Profile</h2>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field className="form-control" label="Login" type="text"
                                name="firstName" id="firstName" onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur}>
                            </Field>
                            {formik.errors.firstName && formik.touched.firstName && <div className="invalid-error">{formik.errors.firstName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <Field className="form-control" label="lastName" type="text"
                                onChange={formik.handleChange} value={formik.values.lastName} name="lastName" id="lastName" onBlur={formik.handleBlur}></Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Phone</label>
                            <Field className="form-control" label="lastName" type="tel"
                                onChange={formik.handleChange} value={formik.values.phone} name="phone" id="phone" onBlur={formik.handleBlur}></Field>
                        </div>
                        <button className="btn btn_offset"type="submit" disabled={!(formik.isValid)}>Save</button>
                    </form>
                </FormikProvider></div></div>}
    </>
}