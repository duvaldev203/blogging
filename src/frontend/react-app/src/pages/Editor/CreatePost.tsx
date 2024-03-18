import { Editor } from "@tinymce/tinymce-react"
import { ApiKey } from "./TInyAPI"
import { useCallback, useEffect, useState } from "react";
import { X } from 'react-feather'
import { UserResponse } from "../../generated";
import { TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from "../../Constants/LOCAL_STORAGE";

interface CreatePostProps {
    onEditEvent: (value: string) => void,
    onClose: () => void,
    title: string,
    content?: string,
}

const CreatePost: React.FC<CreatePostProps> = (props) => {
    // const [data, setData] = useState<string>('');

    // const handleChangeEditor = useCallback((value: string) => {
    //     setData(JSON.stringify(value));
    // }, [setData])

    return (
        <>
            <section className="z-50 bg-gray-600 dark:bg-slate-500 dark:bg-opacity-50 bg-opacity-60 w-screen h-screen justify-center items-center justify-items-center flex fixed"
                aria-hidden="true"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                <div className="mx-auto rounded-t-xl bg-gray-200">
                    <div className={`text-black font-semibold text-xl w-full h-10 flex justify-between items-center pl-4 pr-2 rounded-t-xl bg-gray-400`}>
                        <span>{props.title}</span>
                        <button className="hover:text-white" onClick={props.onClose}>
                            <X />
                        </button>
                    </div>
                    <div className="relative overflow-hidden bg-opacity-50 overflow-y-scroll">
                        {/* <h1 className='w-full p-2 px-4 text-2xl my-4 underline underline-offset-4 '>Using TinyMCE&nbsp;5 build in React</h1> */}
                        <Editor
                            apiKey={ApiKey} //Inserez votre API ici
                            init={{

                                placeholder: '✨ Soyez créatif et exprimez-vous avec style ! ✍️',
                                height: 500,
                                max_width: 900,
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                image_title: true,
                                file_picker_callback: (cb, value, meta) => {
                                    const input = document.createElement('input');
                                    input.setAttribute('type', 'file');
                                    input.setAttribute('accept', 'image/*');

                                    input.addEventListener('change', (e) => {
                                        const file = e.target.files[0];

                                        const reader = new FileReader();
                                        reader.addEventListener('load', () => {
                                            const id = 'blobid' + (new Date()).getTime();
                                            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                            const base64 = reader.result.split(',')[1];
                                            const blobInfo = blobCache.create(id, file, base64);
                                            blobCache.add(blobInfo);

                                            /* call the callback and populate the Title field with the file name */
                                            cb(blobInfo.blobUri(), { title: file.name });
                                        });
                                        reader.readAsDataURL(file);
                                    });

                                    input.click();
                                },
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                // ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
                            value={props.content}
                            onEditorChange={props.onEditEvent}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreatePost; 
