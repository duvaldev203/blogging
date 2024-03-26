import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import PageIllustration from '../../components/PageIllustration';
import Card from '../../components/carousel/Card';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import { ArticleControllerApi, ArticleResponse } from '../../generated';
import { useSelector } from 'react-redux';
import { ReduxProps } from '../../redux/configureStore';
import { Link } from 'react-router-dom';
import { selectArticle } from '../../redux/Actions/ArticleAction';

const Articles: React.FC = () => {
  const state = useSelector((state: ReduxProps) => state);
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    const articleApi = new ArticleControllerApi({ ...state.environment });

    setIsLoading(true);
    articleApi.index7()
      .then((response) => {
        if (response && response.data) {
          setArticles(response.data)
          // console.log("Articles",articles)
        }
      }).catch((err) => {
        alert(err?.response?.data?.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleClick = (item: ArticleResponse) => {
    selectArticle(item);
  };

  return (
    <>
      {/* <DisplayArticle  /> */}
      <div className="flex flex-col min-h-screen overflow-hidden">

        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="grow">

          {/*  Page illustration */}
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>

          <section className="relative"
            aria-hidden="true"
            data-aos="fade-up"
            data-aos-delay="400">
            <div className="mx-auto px-4 sm:px-6 pt-20">

              <div className="relative h-96 overflow-hidden bg-indigo-900 bg-opacity-50">
                <img src='/images/landscape/1536016414.svg' className="absolute object-cover w-full bg-opacity-50" alt="landscape 5.svg" />
                {/* <img src={L1536016414} className="absolute object-cover w-full h-full" alt="landscape 5.svg" /> */}
                <div className="absolute inset-0 bg-black opacity-25">
                </div>
                {/* <header className="absolute top-0 left-0 right-0 z-20">
                  <nav className="container px-6 py-4 mx-auto md:px-12">
                    <div className="items-center justify-between md:flex">
                      <div className="flex items-center justify-between">
                        <div className="md:hidden">
                          <button className="text-white focus:outline-none">
                            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              </path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="items-center hidden md:flex">
                        <a className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300">
                          About us
                        </a>
                        <a className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300">
                          Calendar
                        </a>
                        <a className="mx-3 text-lg text-white uppercase cursor-pointer hover:text-gray-300">
                          Contact us
                        </a>
                      </div>
                    </div>
                  </nav>
                </header> */}
                <div className="container relative z-10 flex items-center px-6 py-32 mx-auto xl:py-40">
                  <div className="relative z-10 flex flex-col items-start lg:w-3/5 xl:w-2/5">
                    <span className="font-bold text-yellow-400 uppercase">
                      Himalaya
                    </span>
                    <h1 className="mt-4 text-6xl font-bold leading-tight text-white sm:text-7xl w-[200%]">
                      Let yourself be carried
                      <br />
                      by nature
                    </h1>
                    {/* <a href="/articles#posts" className="block px-4 py-3 mt-10 text-lg font-bold text-gray-800 uppercase bg-white rounded-lg hover:bg-gray-100">
                    Discover
                  </a> */}
                  </div>
                </div>
              </div>

            </div>
            <div id='posts'
              className="pt-4 mx-auto px-4 pb-10">
              <div className="flex justify-between my-2">
                <span className="text-xl font-bold mx-2">Posts</span>
                <div className="">
                  <SearchBar />
                </div>
              </div>
              <hr />
              <div className="w-full py-5 grid grid-cols-1 justify-center lg:grid-cols-3 box-border justify-items-center items-center">
                {articles.map(item => <Link to={`/article/${item.id!}`} onClick={() => handleClick(item)} ><Card article={item} /></Link>)}

                {/* Trois posts */}
                {/* <Link to={'/article/1'}>
                <Card style='max-lg:my-4 max-lg:max-w-2xl' tags={['infographe', 'infos soc', 'all']} />
              </Link>
              <Card style='max-lg:my-4 max-lg:max-w-2xl' tags={['intelligence', 'intelligence artificielle', 'intelligencia']} />
              <Card style='max-lg:my-4 max-lg:max-w-2xl' tags={['infographe', 'infographie', 'camera', 'voyage']} />
              {/* Trois posts */}
                {/* <Card style='max-lg:my-4 max-lg:max-w-2xl' tags={['infographe', 'infos soc', 'all']} />
              <Card style='max-lg:my-4 max-lg:max-w-2xl' tags={['intelligence', 'intelligence artificielle', 'intelligencia']} />
              <Card style='max-lg:my-4 max-lg:max-w-2xl' tags={['infographe', 'infographie', 'camera', 'voyage']} /> */}
              </div>

            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}

export default Articles;
