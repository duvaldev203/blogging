import { Editor } from "@tinymce/tinymce-react"
import { ApiKey } from "./TInyAPI"
import { X } from 'react-feather'
import { useEffect, useState } from "react"
import { MediaControllerApi, MediaResponse, UserResponse } from "../../generated"
import { ReduxProps } from "../../redux/configureStore"
import { TOKEN_LOCAL_STORAGE_KEY } from "../../Constants/LOCAL_STORAGE"
import { useSelector } from "react-redux"
import MediaItem from "../../components/Media/MediaItem"

interface CreatePostProps {
    onEditEvent: (value: string) => void,
    onClose: () => void,
    title: string,
    content?: string,
    user: UserResponse,
}

const CreatePost: React.FC<CreatePostProps> = (props) => {
    const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const state = useSelector((state: ReduxProps) => state);
    const [medias, setMedias] = useState<MediaResponse[]>([]);
    // const [data, setData] = useState<string>('');

    // const handleChangeEditor = useCallback((value: string) => {
    //     setData(JSON.stringify(value));
    // }, [setData])

    useEffect(() => {
        const mediaApi = new MediaControllerApi({ ...state.environment, accessToken: token })
        mediaApi.index4()
            .then((response) => {
                if (response && response.data) {
                    setMedias(response.data);
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                // setLoading(false);    
            })
    }, []);

    return (
        <section className="z-50 bg-gray-600 dark:bg-slate-500 dark:bg-opacity-50 bg-opacity-60 w-screen justify-center items-center justify-items-center flex fixed inset-0 overflow-y-scroll py-2"
            aria-hidden="true"
            data-aos="fade-up"
            data-aos-delay="400"
        >
            <div className="mx-auto rounded-t-xl bg-gray-200 mt-40">
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
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            image_title: true,
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
                <div className="border mb-5">
                    <h3 className="font-semibold text-gray-900 px-4 mt-5">Importez vos Medias</h3>
                    <div className="flex overflow-x-auto">
                        {medias && medias.map(item => <MediaItem media={item} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreatePost; 
