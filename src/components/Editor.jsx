//import react  
import React, { useMemo, useRef } from "react";

//import api
import Api from '../api';

//import react Quill
import ReactQuill from 'react-quill';

// quill CSS
import 'react-quill/dist/quill.snow.css';

//import recoil state
import { useRecoilState } from "recoil";

//import global state
import { editorState } from "../store";

function Editor(props) {
    
    //state with recoil state
    const [content, setContent] = useRecoilState(editorState);

    //init ref React Quill
    let quillRef = useRef(ReactQuill || null);

    const modules = useMemo(()=>({
        toolbar: {
        container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
            
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'direction': 'rtl' }],                         // text direction
            
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'align': [] }], 
                ['link', 'image'],        
        ],
        },
    }), []);

    //function "onContentChange"
    const onContentChange = (content) => {
        setContent(content)
    }

    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content || props.content}
            modules={modules}
            onChange={(content) => onContentChange(content)}
        />        
    )

}

export default React.memo(Editor);