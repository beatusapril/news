import { Field, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { READER } from "../../../consts/consts";
import { getUser } from "../../../selectors/selectors";
import { newsCreate } from "../../../store/news/newsAction";
import { Store } from "../../../store/Types";
import { NewsCreateRequest, NewState } from "../../../types/News";
import { UserInfo } from "../../../types/User";
import { Header } from "../../header/Header";
import { TagInput } from "../tagInput/TagInput";
import '../newCreate/NewsCreate.css'


export function NewsCreate() {

    const [newInfo, setNewInfo] = useState<NewsCreateRequest>({
        header: '',
        description: '',
        publicationDate: new Date(Date.now()).toDateString(),
        state: NewState.published,
        tags: []
    });
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));

    const validateDescription = (errors: any, values: NewsCreateRequest) => {
        if (!values.description) {
            errors.description = 'Required'
            return;
        }
        if (values.description.length < 150) {
            errors.description = 'Length must be more 150 symbols'
        }
    }

    const validate = (values: NewsCreateRequest) => {
        const errors = { header: '', description: '', publicationDate: '', state: '' };
        if (!values.header) {
            errors.header = 'Required';
        }
        validateDescription(errors, values);
        if (!values.publicationDate) {
            errors.publicationDate = 'Required'
        }
        if (!values.state) {
            errors.state = 'Required'
        }
        if (!errors.header && !errors.description && !errors.publicationDate && !errors.state){
            return {};
        }
        return errors;
    }

    const onDelete = (name: string) => {
        if (newInfo.tags !== null && newInfo.tags !== undefined) {
            const newTags = [...newInfo.tags?.filter(tag => tag != name)];
            setNewInfo({ ...newInfo, tags: newTags })
        }
    }
    const addTag = (tagNew: string) => {
        if (newInfo.tags !== null && newInfo.tags !== undefined && tagNew) {
            if (newInfo.tags?.filter(tag => tag === tagNew).length > 0) {
                return;
            };
            newInfo.tags?.push(tagNew);
            const newTags = [...newInfo.tags];
            setNewInfo({ ...newInfo, tags: newTags })
        }
    }

    const formik = useFormik({
        initialValues: newInfo,
        validate: validate,
        onSubmit: onSubmit
    });

    function onSubmit(values: NewsCreateRequest) {
        setNewInfo({ ...values, tags: newInfo.tags });
        dispatch(newsCreate({ ...values, tags: newInfo.tags }));
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/news" />
    }

    if (user && user.role === READER) {
        return <Navigate to="/news" />
    }

    return <div>
        <Header />
        <div className="wrapper">
            <div className="create-news">
            <h3 className="create-news__header">Create news</h3>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="date">Publication Date</label>
                        <input type="datetime-local" className="form-control create-news__date" name="date" id="date" onChange={date => formik.setFieldValue("publicationDate", date.target.value)} onBlur={formik.handleBlur}></input>
                        {formik.errors.publicationDate && formik.touched.publicationDate && <div className="text-field__message">{formik.errors.header}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="header">Header</label>
                        <Field className="form-control" label="Header" type="text"
                            name="header" id="header" onChange={formik.handleChange} value={formik.values.header} onBlur={formik.handleBlur}>
                        </Field>
                        {formik.errors.header && formik.touched.header && <div className="text-field__message">{formik.errors.header}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" name="description" onChange={formik.handleChange} rows={5} value={formik.values.description} onBlur={formik.handleBlur}>
                            {formik.values.description}
                        </textarea>
                        {formik.errors.description && formik.touched.description && <div className="text-field__message">{formik.errors.description}</div>}
                    </div>
                    <div className="form-group">
                        <label className="text-field__label" htmlFor="state">State</label>
                        <Field className="form-control" id="state" as="select" name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value={NewState.published}>Published</option>
                            <option value={NewState.draft}>Draft</option>
                        </Field>
                    </div>
                    <TagInput tags={newInfo.tags} onDelete={onDelete} addTag={addTag}/>
                    <div className="news-create__button-panel">
                    <button type="submit" className="btn btn-custom" disabled={!(formik.isValid)}>Submit</button>
                    </div>
                </form>
            </FormikProvider>
            </div>
        </div>
    </div>
}
