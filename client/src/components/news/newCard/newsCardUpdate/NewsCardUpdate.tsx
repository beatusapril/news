import { Field, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TEXTAREA_CONTENT_ROWS } from "../../../../consts/consts";
import { newsUpdateAction } from "../../../../store/news/newsAction";
import { NewState, NewsUpdateRequest } from "../../../../types/News";
import { fromNewsInfo } from "../../../../utils/Utils";
import { TagInput } from "../../tagInput/TagInput";
import { NewsCardUpdateProps } from "./NewsCardUpdateType";
import '../newsCardUpdate/NewsCardUpdate.css'

export function NewsCardUpdate(props: NewsCardUpdateProps){
    const [tags, setTags] = useState(props.news.tags)
    const dispatch = useDispatch();

    const validateDescription = (errors: any, values: NewsUpdateRequest) => {
        if (!values.description) {
            errors.description = 'Required'
            return;
        }
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

    function onCancel() {
        props.resetUpdate();
    }

    return <div>
        <div>
            Update news
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} >
                    <div>
                        <label htmlFor="date">Publication Date</label>
                        <input type="datetime-local" value={formik.values.publicationDate} name="date" id="date" onChange={date => formik.setFieldValue("publicationDate", date.target.value)} onBlur={formik.handleBlur}></input>
                        {formik.errors.publicationDate && formik.touched.publicationDate && <div className="invalid-error">{formik.errors.header}</div>}
                    </div>
                    <div>
                        <label htmlFor="header" className="text-field__label">Header</label>
                        <Field className="card-update__header" label="Header" type="text"
                            name="header" id="header" onChange={formik.handleChange} value={formik.values.header} onBlur={formik.handleBlur}>
                        </Field>
                        {formik.errors.header && formik.touched.header && <div className="invalid-error">{formik.errors.header}</div>}
                    </div>
                    <div className="text-field">
                        <label htmlFor="description">Description</label>
                        <textarea className="card-update__description" rows={TEXTAREA_CONTENT_ROWS} name="description" onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur}>
                            {formik.values.description}
                        </textarea>
                        {formik.errors.description && formik.touched.description && <div className="invalid-error">{formik.errors.description}</div>}
                    </div>
                    <div className="text-field">
                        <label className="text-field__label" htmlFor="state">State</label>
                        <Field className="text-field__input" id="state" as="select" name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value={NewState.published}>Published</option>
                            <option value={NewState.draft}>Draft</option>
                        </Field>
                    </div>
                    <TagInput tags={tags} onDelete={onDelete} addTag={addTag}/>
                    <div className="news-card-update__button-panel">
                    <button type="submit" disabled={!(formik.isValid)} className="btn-custom news-card-update_offset">Submit</button>
                    <button type="button" className="btn-custom-no-active" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </FormikProvider>
        </div>
    </div>
}