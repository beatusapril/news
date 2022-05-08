import { Field, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { READER } from "../../../consts/consts";
import { getTags, getUser } from "../../../selectors/selectors";
import { newsCreate } from "../../../store/news/newsAction";
import { tagsFetchAction } from "../../../store/tags/TagsAction";
import { Store } from "../../../store/Types";
import { NewsCreateRequest, NewState } from "../../../types/News";
import { UserInfo } from "../../../types/User";
import { Header } from "../../header/Header";
import { TagRowFilter } from "../filter/Filter";
import DatePicker from "react-datepicker";


export function NewsCreate() {

    const [newInfo, setNewInfo] = useState<NewsCreateRequest>({
        header: '',
        description: '',
        publicationDate: new Date(Date.now()).toDateString(),
        state: NewState.published,
        tags: []
    });
    const tags = useSelector<Store, string[]>(state => getTags(state));
    const [newTag, setNewTag] = useState('');
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));

    useEffect(() => {
        dispatch(tagsFetchAction());
    }, []);

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
    const addTag = () => {
        if (newInfo.tags !== null && newInfo.tags !== undefined && newTag) {
            if (newInfo.tags?.filter(tag => tag === newTag).length > 0) {
                return;
            };
            newInfo.tags?.push(newTag);
            const newTags = [...newInfo.tags];
            setNewInfo({ ...newInfo, tags: newTags })
        }
    }
    const onChangeTag = (ev: any) => {
        if (ev.target.value) {
            setNewTag(ev.target.value);
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
        <div>
            Create news
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} >
                    <div className="text-field">
                        <label htmlFor="date" className="text-field__label">Publication Date</label>
                        <input type="date" name="date" id="date" onChange={date => formik.setFieldValue("publicationDate", date.target.value)} onBlur={formik.handleBlur}></input>
                        {formik.errors.publicationDate && formik.touched.publicationDate && <div className="text-field__message">{formik.errors.header}</div>}
                    </div>
                    <div className="text-field">
                        <label htmlFor="header" className="text-field__label">Header</label>
                        <Field className="text-field__input" label="Header" type="text"
                            name="header" id="header" onChange={formik.handleChange} value={formik.values.header} onBlur={formik.handleBlur}>
                        </Field>
                        {formik.errors.header && formik.touched.header && <div className="text-field__message">{formik.errors.header}</div>}
                    </div>
                    <div className="text-field">
                        <label className="text-field__label" htmlFor="description">Description</label>
                        <textarea name="description" onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur}>
                            {formik.values.description}
                        </textarea>
                        {formik.errors.description && formik.touched.description && <div className="text-field__message">{formik.errors.description}</div>}
                    </div>
                    <div className="text-field">
                        <label className="text-field__label" htmlFor="state">State</label>
                        <Field className="text-field__input" id="state" as="select" name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value={NewState.published}>Published</option>
                            <option value={NewState.draft}>Draft</option>
                        </Field>
                    </div>
                    <div>
                        <ul>
                            {newInfo.tags?.map(tag => <li><TagRowFilter name={tag} onDelete={onDelete} /> </li>)}
                        </ul>
                        <div>
                            <select onChange={onChangeTag}>
                                <option>{''}</option>
                                {tags.map(tag => <option>{tag}</option>)}
                            </select>
                            <button type="button" onClick={addTag}>Add tag</button>
                        </div>
                    </div>
                    <button type="submit" disabled={!(formik.isValid)}>Submit</button>
                </form>
            </FormikProvider>
        </div>
    </div>
}
