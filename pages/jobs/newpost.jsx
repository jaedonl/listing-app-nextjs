import React, {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import styles from "../../styles/Newpost.module.scss";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import MyEditor from '../../components/MyEditor';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { toggleClass } from 'dom-helpers';


const post = () => {
    const [inputs, setInputs] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const { data: session } = useSession()
    const authUser = useSelector(state => state.auth)    
    const router = useRouter()

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );
    const editor = useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    useEffect(() => {
        // console.log(inputs)       
        console.log(editor.current); 
    })

    const StyleButton = (props) => {
        let onClickButton = (e) => {
            e.preventDefault();
            props.onToggle(props.style);       
            e.target.classList.add(`${styles.active}`)

            e.currentTarget.classList.add(`${styles.active}`)
        };
        return <button onMouseDown={onClickButton} className={`${styles.text_editor_options_button}`}>{props.label}</button>;
    };
    
    const BLOCK_TYPES = [
        { label: "H1", style: "header-one" },
        { label: "H2", style: "header-two" },
        { label: "H3", style: "header-three" },
        { label: "H4", style: "header-four" },
        { label: "H5", style: "header-five" },
        { label: "H6", style: "header-six" },
        { label: "Blockquote", style: "blockquote" },
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" },
        { label: "Code Block", style: "code-block" }
    ];

    const BlockStyleControls = (props) => {
        return (
            <div className={styles.block_types}>
                {BLOCK_TYPES.map((type) => (
                <StyleButton
                    key={type.label}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}                    
                />
                ))}
            </div>
        );
    };

    const INLINE_STYLES = [
        { label: "Bold", style: "BOLD" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" },
        { label: "Monospace", style: "CODE" }
    ];
    const InlineStyleControls = (props) => {
        return (
            <div className={styles.inline_types}>
                {INLINE_STYLES.map((type) => (
                <StyleButton
                    key={type.label}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
                ))}
            </div>
        );
    };

    const onInlineClick = (e) => {
        let nextState = RichUtils.toggleInlineStyle(editorState, e);
        setEditorState(nextState);
    };
    
    const onBlockClick = (e) => {
        let nextState = RichUtils.toggleBlockType(editorState, e);
        setEditorState(nextState);                
    };


    useEffect(() => {
        if (!session && !authUser.user) router.push('/auth/login')            
        if (session) {
            setInputs((prev) => {
                return {...prev, author: session.user?.id, views: 0, job_type: 'full-time', commute_type: 'remote', sponsorship: false}
            })            
        }
        if (authUser) {
            setInputs((prev) => {
                return {...prev, author: authUser.user?._id, views: 0, job_type: 'full-time', commute_type: 'remote', sponsorship: false}
            })            
        }                
    }, [session, authUser])    



    const handleChange = (e) => {
        let updatedValue = e.target.value        

        if (e.target.name === 'tags') {
            updatedValue = e.target.value.split(',')
            setInputs((prev) => {
                return {...prev, [e.target.name]: updatedValue}
            })
        }

        if (e.target.name === 'sponsorship' && e.target.value === 'true') {
            updatedValue = JSON.parse(e.target.value)
            setInputs((prev) => {
                return {...prev, [e.target.name]: updatedValue}
            })
        } else if (e.target.name === 'sponsorship' && e.target.value === 'false') {
            updatedValue = JSON.parse(e.target.value)
            setInputs((prev) => {
                return {...prev, [e.target.name]: updatedValue}
            })
        }   

        setInputs((prev) => {
            return {...prev, [e.target.name]: updatedValue}
        })        
    }


    const handleSubmit = async (e) => {    
        e.preventDefault()                   
        try {
            await axios.post('http://localhost:3000/api/jobs', inputs);
        } catch (error) {
            console.log(error)
        }
    }        

    return (
        <main className={styles.post_template}>        
            <Head>
                <title>Create Post | JdonL</title>
                <meta charset="utf-8" />
                <meta name="description" content="post new job" />
                <link rel="icon" href="/favicon.ico" />                
            </Head>
            <section className={styles.form_container}>                
                <h1>Post job</h1>           
                <form className={styles.post_form}>                           
                    
                    <div className={styles.input_section}>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"                            
                                placeholder="Title"                            
                                aria-label="input title"
                                className={styles.form_input}
                                onChange={handleChange}
                            />
                            {error && errorMessage === 'Please input title.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>

                        <div className={styles.input_wrapper}>
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"                            
                                placeholder="Company"                            
                                aria-label="input company"
                                className={styles.form_input}
                                onChange={handleChange}
                            />
                            {error && errorMessage === 'Please input company.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>
                    </div>                      
                    

                    <div className={styles.input_section}>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="logo">Company logo</label>
                            <input
                                type="text"
                                id="logo"
                                name="img"                            
                                placeholder="Company logo URL"                            
                                aria-label="input logo"
                                className={styles.form_input}
                                onChange={handleChange}
                            />
                            {error && errorMessage === 'Please input logo URL.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>

                        <div className={styles.input_wrapper}>
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"                            
                                placeholder="location"                            
                                aria-label="input location"
                                className={styles.form_input}
                                onChange={handleChange}
                            />
                            {error && errorMessage === 'Please input location.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>                        
                    </div>


                    <div className={styles.input_section}>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="pay">Pay</label>
                            <input
                                type="text"
                                id="pay"
                                name="pay"                            
                                placeholder="Pay"                            
                                aria-label="input pay"
                                className={styles.form_input}
                                onChange={handleChange}
                            />
                            {error && errorMessage === 'Please input pay.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>

                        <div className={styles.input_select_container}>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="job_type">Job type</label>
                            <select type="select" id="job_type" name="job_type" aria-label="input job type" className={`${styles.form_input} ${styles.form_select}`}
                            defaultValue="full-time" onChange={handleChange}>                            
                                <option value="full-time">full-time</option>
                                <option value="part-time">part-time</option>                                
                            </select>
                            {error && errorMessage === 'Please select job type.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>        

                        <div className={styles.input_wrapper}>
                            <label htmlFor="commute_type">Commute type</label>
                            <select type="select" id="commute_type" name="commute_type" aria-label="input commute type" className={`${styles.form_input} ${styles.form_select}`}
                            defaultValue="remote" onChange={handleChange}>                            
                                <option value="remote">Remote</option>
                                <option value="on-site">On-site</option>                                
                                <option value="hybrid">Hybrid</option>                                
                            </select>
                            {error && errorMessage === 'Please select commute type.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>              
                        

                        <div className={styles.input_wrapper}>
                            <label htmlFor="sponsorship">Sponsorship</label>
                            <select type="select" id="sponsorship" name="sponsorship" aria-label="input sponsorship" className={`${styles.form_input} ${styles.form_select}`}
                            defaultValue="false" onChange={handleChange}>          
                                <option value="false">No sponsorship</option>                  
                                <option value="true">Sponsorship</option>                                
                            </select>
                            {error && errorMessage === 'Please input pay.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>
                        </div>

                        
                    </div>

                    <div className={styles.input_section}>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"                            
                                placeholder="Email"                            
                                aria-label="input email"
                                className={styles.form_input}
                                onChange={handleChange}
                            />
                            {error && (errorMessage === 'Wrong email.' || errorMessage === 'Please input email.') && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>  
                        
                        <div className={styles.input_wrapper}>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"                            
                                placeholder="Phone"                            
                                aria-label="input phone"
                                className={styles.form_input}
                                onChange={handleChange}
                            />
                            {error && errorMessage === 'Please input phone.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>

                        <div className={styles.input_wrapper}>
                            <label htmlFor="website">Website link</label>
                            <input
                                type="text"
                                id="website"
                                name="website"                            
                                placeholder="Website link"                            
                                aria-label="input website link"
                                className={styles.form_input}
                                onChange={handleChange}
                            />
                            {error && errorMessage === 'Please input website link.' && <span className={styles.error_message}>{errorMessage}</span>}           
                        </div>
                    </div>                                      

                    
                    <div className={styles.input_wrapper}>
                        <label htmlFor="tag">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"                            
                            placeholder="Please add comma for each tag words."                            
                            aria-label="input tags"
                            className={`${styles.form_input} ${styles.tags}`}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input tags.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>                    

                    <div className={styles.input_wrapper}>
                        <label htmlFor="description">Description</label>
                        {/* <MyEditor /> */}
                        <div className={styles.text_editor_container} onClick={focusEditor}>
                            <div className={styles.text_editor_options}>
                                <BlockStyleControls onToggle={onBlockClick} />
                                <InlineStyleControls onToggle={onInlineClick} />
                            </div>
                            
                            <div className={styles.text_editor_body}>
                                <Editor
                                    ref={editor}
                                    editorState={editorState}
                                    onChange={setEditorState}
                                    // placeholder="Write something!"                                
                                />
                            </div>                            
                        </div>       
                    </div>
                    {/* <div className={styles.input_wrapper}>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="desc"
                            name="desc"                            
                            placeholder="Description"                            
                            aria-label="input description"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input description.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>                                                             */}                             

                    <div className={styles.post_btn_wrapper}>
                        <button type="button" aria-label="post button" className={styles.post_btn} onClick={handleSubmit}>Post</button>
                    </div>
                    
                </form>
            </section>
        </main>
    )
}

export default post