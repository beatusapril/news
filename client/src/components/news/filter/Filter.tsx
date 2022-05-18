import { FormikProvider, FormikState, FormikValues, useFormik } from "formik";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../../selectors/selectors";
import { tagsFetchAction } from "../../../store/tags/TagsAction";
import { Store } from "../../../store/Types";
import { NewsRequest } from "../../../types/News"
import { FilterProps, TagRowFilterProps } from "./FilterTypes"
import '../filter/Filter.css'


export function TagRowFilter(props: TagRowFilterProps) {
    function onDelete() {
        props.onDelete(props.name);
    }
    return <div className="filter__tag-row">
        {props.name} <button className="filter__tag-del-btn" onClick={onDelete}></button>
    </div>
}

export function Filter(props: FilterProps) {
    const [newRequest, setNewRequest] = useState<NewsRequest>({
        tags: [],
        onlyNew: false,
        author: null,
        header: null,
        onlyDraft: null,
        offset: 0,
        limit: 0
    })
    const [newTag, setNewTag] = useState('');
    const tags = useSelector<Store, string[]>(state => getTags(state));
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(tagsFetchAction());
    }, [])
    const onDelete = (name: string) => {
        if (newRequest.tags !== null && newRequest.tags !== undefined) {
            const newTags = [...newRequest.tags?.filter(tag => tag != name)];
            setNewRequest({ ...newRequest, tags: newTags })
        }
    }
    const addTag = () => {
        if (newRequest.tags !== null && newRequest.tags !== undefined && newTag) {
            if (newRequest.tags?.filter(tag => tag === newTag).length > 0) {
                return;
            };
            newRequest.tags?.push(newTag);
            const newTags = [...newRequest.tags];
            setNewRequest({ ...newRequest, tags: newTags })
            setNewTag('');
        }
    }
    const onChangeTag = (ev: any) => {
        if (ev.target.value) {
            setNewTag(ev.target.value);
        }
    }
    const reset = (values: NewsRequest) => {
        setNewRequest({
            tags: [],
            onlyNew: false,
            author: null,
            header: null,
            onlyDraft: false,
            offset: 0,
            limit: 0
        });
        props.onReset({
            tags: [],
            onlyNew: false,
            author: null,
            header: null,
            onlyDraft: false,
            offset: 0,
            limit: 0
        })
        formik.resetForm();
    }
    const submit = (values: NewsRequest) => {
        const tags = newRequest.tags;
        setNewRequest({ ...values, tags: tags });
        props.onSubmit({ ...values, tags: tags });
    }

    const formik = useFormik({
        initialValues: newRequest,
        onSubmit: submit
    });

    return <div className="filter-block">
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input id="author" className="form-control" value={formik.values.author ? formik.values.author : ''} onChange={formik.handleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="header">Header</label>
                    <input id="header" className="form-control" value={formik.values.header ? formik.values.header : ''} onChange={formik.handleChange}></input>
                </div>
                <div className="form-group">
                    <label className="only-new-label" htmlFor="onlyNew">Only new</label>
                    <input  id="onlyNew" type="checkbox" value={formik.values.onlyNew ? String(formik.values.onlyNew) : ''}></input>
                </div>
                <div>
                    <ul>
                        {newRequest.tags?.map(tag => <li className="filter__tag-list-item"><TagRowFilter name={tag} onDelete={onDelete} /> </li>)}
                    </ul>
                    <div>
                        <select className="filter__select-tags" value={newTag} onChange={onChangeTag}>
                            <option>{''}</option>
                            {tags.map(tag => <option>{tag}</option>)}
                        </select>
                        <button className="btn btn-custom" type="button" onClick={addTag}>Add tag</button>
                    </div>
                </div>
                <button className="btn btn-custom filter__btn-apply" type="submit">Apply</button>
                <button className="btn btn-custom filter__btn-reset" type="reset" onClick={ev => reset(formik.values)}>Reset</button>
            </form>
        </FormikProvider>
    </div>
}