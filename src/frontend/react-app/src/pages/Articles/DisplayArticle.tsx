import { connect, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PageIllustration from "../../components/PageIllustration";
import SmallCard from "../../components/carousel/SmallCard";
import { ArticleControllerApi, ArticleResponse } from "../../generated";
import ShareArticle from "./ShareArticle";
import { ReduxProps } from "../../redux/configureStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRandomColors, hexToRGBA, post_time } from "../../Constants/APP_CONSTANT";
import { BASE_PATH } from "../../generated/base";

const DisplayArticle: React.FC = () => {

  const state = useSelector((state: ReduxProps) => state);
  const { id } = useParams<{ id: string }>();

  const defaultArticle: ArticleResponse = {
    user: {
      firstName: 'Jean',
      lastName: 'Miguel'
    },
    tags: [{ name: 'premier tag' }, { name: 'second tag' }, { name: 'troisieme tag' }, { name: 'quatrieme tag' }],
    title: 'Ask HN: Does Anybody Still Use JQuery?',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry\. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  }

  const [article, setArticle] = useState<ArticleResponse>(defaultArticle);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const colors: string[] = getRandomColors(article.tags?.length!);

  useEffect(() => {
    // console.log("Articles Loaded !!! ", article);
    const articleApi = new ArticleControllerApi({ ...state.environment });
    articleApi.show7(+id!)
      .then((response) => {
        // console.log(response)
        if (response && response.data) {
          setArticle(response.data)
        }
      }).catch((err) => {
        if (err.response.status == 302) {
          // console.log(err.response)
          setArticle(err.response.data)
        } else {
          alert(err?.response?.data?.message);
        }
      }).finally(() => {
        setIsLoading(false);
      })
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <div className="mx-auto px-2 pt-20">
          <div className="relative h-80 overflow-hidden bg-indigo-900 bg-opacity-50">
        {article.cover ? <img src={BASE_PATH + "/articles/getCover/" + article.id} alt="" className="w-full h-full rounded-2xl object-cover" /> : <img className="w-full h-full rounded-2xl object-cover" src="images/landscape/1536016414.svg" alt="Sunset in the mountains" />}
            {/* <img src='/images/landscape/1536016414.svg' className="absolute object-fill object-bottom w-full bg-opacity-50" alt="landscape 5.svg" /> */}
          </div>
          <div className="my-4 flex w-full">
            {/*-- Reseaux Sociaux --*/}
            <ShareArticle article={article} />

            {/*-- Contenu du post --*/}
            <div className="mx-auto px-4 pb-10">
              <div className="max-w-4xl justify-items-center my-2 space-y-5 text-justify">
                <div className="my-4">
                  <div className="flex mx-10">
                    <a href="#" className="relative block">
                      <img alt="profile" src="/images/default.png" className="mx-auto object-cover rounded-full h-20 w-20 " />
                    </a>
                    <div className="flex flex-col justify-between ml-2">
                      <div>
                        <span className="text-2xl font-semibold text-indigo-500">
                          {article.user?.firstName + " " + article.user?.firstName}
                        </span>
                        {/* <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                          2 months ago
                        </span> */}
                      </div>
                      <div className="grid grid-cols-1 items-center text-lg dark:text-gray-400">
                        <span>
                          User of Tail-Kit
                        </span>
                        <span className="text-base text-gray-500 dark:text-gray-300">
                          {post_time(article.createdAt!)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tout les tags */}
                <div className="space-y-2">
                  <div className="flex space-x-2 mx-5">
                    {article.tags && <div className="flex px-5 space-x-2 mb-2 ">
                      {article.tags.map((tag, index) => {
                        let color = hexToRGBA(colors[index % colors.length], 0.1);  // 0.5 is the opacity
                        return (
                          <p style={{ backgroundColor: color }} className="px-2 dark:text-stone-50 h-6 whitespace-nowrap overflow-hidden rounded-md">{tag.name}</p>
                        )
                      })}
                    </div>}
                  </div>
                  <hr />
                </div>
                {/* Titre du post  */}
                {/* <p className="text-3xl">Ask HN: Does Anybody Still Use JQuery?</p> */}
                <p className="text-3xl">{article.title}</p>

                {/* Corps du post */}
                <div className="container">
                  <span>{article.content}</span>
                </div>

                {/* Media s'il y en a */}
                <div className="post-images grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <img src="/images/hero-image-01.jpg" alt="" className="object-cover" />
                  <img src="/images/hero-image-01.jpg" alt="" className="object-cover" />
                  <img src="/images/hero-image-01.jpg" alt="" className="object-cover" />
                </div>

                {/* A utiliser 
                <div className="post-images grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <img key={index} src={image.src} alt={image.alt || ''} className="w-full h-auto cursor-pointer" onClick={() => setSelectedImg(image.src)} />
                  ))}
                </div>

                {selectedImg && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={() => setSelectedImg(null)}>
                    <img src={selectedImg} alt="Selected" className="max-h-full max-w-full" />
                  </div>
                )} */}

              </div>
              <div className="max-w-4xl space-y-5 mt-10">
                <span className="text-3xl font-bold">Commentaire(s) </span>

                {/* Formulaire d'envoi du commentaire */}
                <form className="mx-4 grid grid-cols-1 space-y-2 justify-start">
                  <textarea
                    name="comment"
                    id="comment"
                    rows={5}
                    placeholder="Votre Commentaire..."
                    className="resize-y rounded-xl p-2.5 w-[90%] text-gray-900 border bg-gray-100 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </textarea>
                  <button type="submit" className="bg-blue-700 hover:bg-blue-800 w-32 py-1.5 rounded-lg font-bold text-white">Envoyer...</button>
                </form>

                {/* Differents Commentaires */}
                <div className="flex space-x-2 py-4 my-2 border-t-2 border-t-gray-600">
                  <img src="/images/hero-image-01.jpg" className="object-cover h-16 w-16 rounded-full" />
                  <span className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, libero dolorum repellendus odio accusantium culpa aut reiciendis. Aperiam perspiciatis ratione officia, voluptas quam quod doloremque adipisci ea dolore atque eligendi.
                    Neque, non. Facilis commodi vero porro, molestias nisi deleniti tenetur consequatur optio id, accusamus asperiores cum maiores et! Facilis illo odit provident veniam, culpa ipsa optio nostrum. Ex, ipsa quam?</span>
                </div>
                <div className="flex space-x-2 py-4 my-2 border-t-2 border-t-gray-600">
                  <img src="/images/hero-image-01.jpg" className="object-cover bg-opacity-50 h-16 w-16 rounded-full" />
                  <span className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, libero dolorum repellendus odio accusantium culpa aut reiciendis. Aperiam perspiciatis ratione officia, voluptas quam quod doloremque adipisci ea dolore atque eligendi.</span>
                </div>
                <div className="flex space-x-2 py-4 my-2 border-t-2 border-t-gray-600">
                  <img src="/images/hero-image-01.jpg" className="object-cover h-16 w-16 rounded-full" />
                  <span className="text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                </div>

              </div>

            </div>
          </div>
          <div className="w-full bg-gray-600 px-5 py-10 bg-opacity-50 space-y-5">
            <span className="text-3xl underline underline-offset-[10px] font-bold">Autre articles </span>
            <div className="flex space-x-5 w-full">
              <SmallCard />
              <SmallCard />
              <SmallCard />
              <SmallCard />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DisplayArticle;