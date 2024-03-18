import React, { ChangeEvent, FormEvent, useState } from 'react';

import Header from '../../components/Header';
import PageIllustration from '../../components/PageIllustration';
// import Newsletter from '../components/Newsletter';
import Footer from '../../components/Footer';
import CreatePost from './CreatePost';
import CustomSelectMultiTags from '../../components/CustomSelects/CustomSelectMultiTags';
import { ArticleControllerApi, ArticleResponse, CategoryControllerApi, CategoryResponse, TagControllerApi, TagResponse, UserResponse } from '../../generated';
import { TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from '../../Constants/LOCAL_STORAGE';
import { ReduxProps } from '../../redux/configureStore';
import { useSelector } from 'react-redux';
import CustomSelectCategory from '../../components/CustomSelects/CustomSelectCategory';
import { useNavigate } from 'react-router-dom';

interface EditorProps {
  article?: ArticleResponse
}

const EditorTMCE: React.FC<EditorProps> = (props) => {
  const user: UserResponse = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '{}');
  const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
  const state = useSelector((state: ReduxProps) => state);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: props.article ? props.article.title : '',
    // cover: props.article ? props.article?.cover : '',
    content: props.article ? props.article.content : '',
    totalViews: props.article ? props.article.totalViews : '',
    readingTime: props.article ? props.article.readingTime : 10,
    user: user ? user : {},
    // user: props.article ? props.article.user : {},
    category: props.article ? props.article.category : {},
    tags: props.article ? props.article.tags : [],
  })

  const [image, setImage] = useState<File>();
  const [file, setFile] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([])

  const handleCoverChange = (e: any) => {
    setUploaded(true);
    setFile(URL.createObjectURL(e.target.files[0]));
    const imgData = new FormData();
    let file = e.target.files[0];
    setImage(file);
    imgData.append('image', file);
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);

  const handleTagSelect = (option: TagResponse[]) => {
    setFormData((prevValues) => ({
      ...prevValues,
      tags: option,
    }));
  };

  const handleTypingTag = (keyword: string) => {
    if (keyword.length > 0) {
      const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
      const tagsApi = new TagControllerApi({
        ...state.environment,
        accessToken: token,
      });

      tagsApi
        .recods(keyword)
        .then((response) => {
          if (response && response.data) {
            if (response.status === 200) {
              setTags(response.data);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => { });
    }
  };

  const handleOptionSelect = (item: CategoryResponse) => {
    setFormData((prevValues) => ({
      ...prevValues,
      category: item,
    }));
  };
  const handleTypingInput = (keyword: string) => {
    if (keyword.length > 0) {
      const token: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
      const catApi = new CategoryControllerApi({
        ...state.environment,
        accessToken: token,
      });

      catApi
        .records(keyword)
        .then((response) => {
          if (response.status === 200) {
            setCategories(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => { });
    }
  };

  const handleEditContentModal = (value: string) => {
    setFormData((prevValues) => ({
      ...prevValues,
      content: value,
    }));
  };

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    console.log("Cover", image);
    console.log("Data", JSON.stringify(formData));
    console.log("Data with other method", " " + formData);
    const artApi = new ArticleControllerApi({ ...state.environment, accessToken: token });
    artApi.create7Form(JSON.stringify(formData), image)
      .then((response) => {
        console.log(response)
        if (response && response.data) {
          const article: ArticleResponse = response.data;
          navigate('/article/' + article.id)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {showCreatePost && <CreatePost onClose={() => setShowCreatePost(false)} title='Contenu du post' onEditEvent={handleEditContentModal} content={formData.content} />}

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <section className="relative"
          aria-hidden="true"
          data-aos="fade-up"
          data-aos-delay="400">
          <div className="mx-auto px-4 sm:px-6 pt-20">

            <div className="relative overflow-hidden bg-opacity-50 px-10 lg:px-40 ">
              <h1 className='w-full p-2 px-4 text-2xl font-semibold my-4 underline underline-offset-4 '>Creer facilement votre post</h1>
              <form className="my-5" onSubmit={handleCreatePost}>
                <div className='my-2'>
                  <label htmlFor="cover" className='text-xl font-semibold'>Couverture <span className='text-red-600'>*</span> </label>
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-gray-700 dark:border-gray-200 bg-transparent py-3 px-3 dark:bg-meta-4 sm:py-7"
                  >
                    <input
                      type="file"
                      name="cover"
                      accept="image/*"
                      required
                      onChange={handleCoverChange}
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    {uploaded && <div className="flex flex-col items-center justify-center space-y-1">
                      <img className='m-0 p-0' src={file} alt="Article Cover" />
                    </div>}
                    {!uploaded && <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary text-center justify-center">Cliquer pour ajouter </span> <br /><center>ou</center>
                        Porter et deposer
                      </p>
                      <p className="mt-1.5">PNG, JPEG, JPG or GIF</p>
                      {/* <p>(max, 800 X 800px)</p> */}
                    </div>}
                  </div>
                </div>
                {/* {isErrorCover && <p className='text-danger'>Erreur: {isCoverErrorMessage}</p>} */}
                <div className='my-2 w-full'>
                  <label htmlFor="title" className='text-xl font-semibold'>Titre <span className='text-red-600'>*</span> </label>
                  <textarea name="title" id="title" className='border border-gray-500 bg-transparent rounded-lg w-full' value={formData.title} onChange={handleInputChange}></textarea>
                </div>
                <div className='my-2 w-full'>
                  <label htmlFor="content" className='text-xl font-semibold'>Contenu <span className='text-red-600'>*</span>&nbsp;&nbsp; </label>
                  <span className='hover:text-blue-600 hover:underline underline-offset-2 m-2 cursor-pointer' onClick={() => { setShowCreatePost(true) }}>Cliquer ici</span>
                </div>
                <div className="">
                  <CustomSelectCategory
                    required={true}
                    inputLabel="Category"
                    inputPlaceholder="Saisir une Categorie"
                    wrapperStyle="w-full xl:w-1/2"
                    labelStyle="mb-2.5 block text-black dark:text-white dark:text-gray-200 text-xl font-semibold"
                    inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    maxHeightList={300}
                    matchList={categories}
                    selectOptionEvent={handleOptionSelect}
                    typingInputEvent={handleTypingInput}
                  />
                  <div className="my-2 w-full">
                    <CustomSelectMultiTags
                      required={true}
                      inputLabel="Tags"
                      inputPlaceholder="Saisir un tag"
                      wrapperStyle="w-full xl:w-1/2"
                      labelStyle="mb-2.5 block text-black dark:text-gray-200 text-xl font-semibold"
                      inputStyle="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      maxHeightList={100}
                      selectOptionEvent={handleTagSelect}
                      typingInputEvent={handleTypingTag}
                      matchList={tags}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-blue-600 py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default EditorTMCE;