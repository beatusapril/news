import { Field, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { READER } from "../../../../consts/consts";
import { getUser } from "../../../../selectors/selectors";
import { newsUpdateAction } from "../../../../store/news/newsAction";
import { Store } from "../../../../store/Types";
import { NewState, NewsUpdateRequest } from "../../../../types/News";
import { UserInfo } from "../../../../types/User";
import { fromNewsInfo } from "../../../../utils/Utils";
import { TagInput } from "../../tagInput/TagInput";
import { NewsCardUpdateProps } from "./NewsCardUpdateType";

export function NewsCardUpdate(props: NewsCardUpdateProps){
    const [tags, setTags] = useState(props.news.tags)
    const dispatch = useDispatch();
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));

    const validateDescription = (errors: any, values: NewsUpdateRequest) => {
        if (!values.description) {
            errors.description = 'Required'
            return;
        }
        /* if (values.description.length < 150) {
            errors.description = 'Length must be more 150 symbols'
        } */
    }

    useEffect(()=> setTags([...props.news.tags]), [props.news.tags])

    const validate = (values: NewsUpdateRequest) => {
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
        if (tags !== null && tags !== undefined) {
            const newTags = [...tags?.filter(tag => tag != name)];
            setTags(newTags);
        }
    }
    const addTag = (tagNew: string) => {
        if (tags !== null && tags !== undefined && tagNew) {
            if (tags?.filter(tag => tag === tagNew).length > 0) {
                return;
            };
            tags?.push(tagNew);
            const newTags = [...tags];
            setTags(newTags)
        }
    }

    const formik = useFormik({
        initialValues: fromNewsInfo(props.news),
        validate: validate,
        onSubmit: onSubmit
    });

    function onSubmit(values: NewsUpdateRequest) {
        dispatch(newsUpdateAction({ ...values, tags: tags }));
        props.resetUpdate();
    }

    return <div>
        <div>
            Update news
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
                    <TagInput tags={tags} onDelete={onDelete} addTag={addTag}/>
                    <button type="submit" disabled={!(formik.isValid)}>Submit</button>
                </form>
            </FormikProvider>
        </div>
    </div>
}