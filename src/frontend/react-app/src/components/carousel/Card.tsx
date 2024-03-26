import { Heart, Eye, FileText } from "react-feather";
import { ArticleResponse } from "../../generated";
import { BASE_PATH } from "../../generated/base";
import { post_time, getRandomColors, hexToRGBA } from "../../Constants/APP_CONSTANT";
// import { Link } from "react-router-dom";

export interface CardProps {
  style?: string,
  article?: ArticleResponse,
}

const Card: React.FC<CardProps> = (props) => {

  const defaultArticle: ArticleResponse = {
    title: "The Coldest Sunset",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
    user: {
      lastName: "Jean",
      firstName: "Miguel",
    },
    totalViews: 201,
    tags: [{ name: "infographie" }, { name: "informatique" }, { name: "web design" }],
    createdAt: new Date(),
  }

  const article = props.article ? props.article : defaultArticle;

  // const defaultTitle = "The Coldest Sunset"
  // const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."

  const colors: string[] = getRandomColors(article.tags?.length!);

  return (
    <div className={`relative rounded-xl max-w-sm overflow-hidden shadow-lg dark:bg-gray-800 mx-auto hover:shadow-lg transition duration-1000 hover:-translate-y-1 hover:scale-105 ease-in-out mb-5 ` + props.style}>
      <div className="h-60">
        {article.cover ? <img src={BASE_PATH + "/articles/getCover/" + article.id} alt="" className="w-full h-full rounded-2xl object-cover " /> : <img className="w-full h-full rounded-2xl object-cover" src="images/hero-image-01.jpg" alt="Sunset in the mountains" />}
      </div>
      <div className="px-6 py-4">
        <div className="flex space-x-4">
          <div className="font-bold text-xl mb-2 dark:text-gray-300">{article.title}</div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base text-justify">
          {article.content && <div className="container" dangerouslySetInnerHTML={{ __html: article.content }} />}
        </p>
      </div>
      {article.tags && <div className="flex px-5 space-x-2 mb-2 ">
        {article.tags.map((tag, index) => {
          let color = hexToRGBA(colors[index % colors.length], 0.1);  // 0.5 is the opacity
          return (
            <p style={{ backgroundColor: color }} className="px-2 dark:text-stone-50 h-6 whitespace-nowrap overflow-hidden rounded-md">{tag.name}</p>
          )
        })}
      </div>}
      <div className="mx-6 py-2 border-t border-gray-700 justify-center flex items-center">
        {/* <Link title="Partager" to='/twitter' target="_blank" className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 text-blue-600 hover:text-gray-700 dark:hover:text-gray-200"><Twitter /></Link>
        <Link title='partager' to='/facebook' target="_blank" className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 text-blue-600 hover:text-gray-700 dark:hover:text-gray-200"><Facebook /></Link>
        <Link title='partager' to='/instagram' target="_blank" className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 text-blue-600 hover:text-gray-700 dark:hover:text-gray-200"><Instagram /></Link> */}
        <div className="">
          <div className="flex items-start">
            <a href="#" className="relative block">
              {article.user?.profile ?
                <img src={BASE_PATH + "/users/profile/" + article.user.profile.id} alt="Author picture" className="mx-auto object-cover rounded-full h-10 w-10 " /> :
                <img alt="Default profile" src="/images/default.png" className="mx-auto object-cover rounded-full h-10 w-10 " />}
            </a>
            <div className="flex flex-col justify-between ml-2">
              <div>
                <span className="text-sm font-semibold text-indigo-500">
                  {article.user!.firstName + " " + article.user!.lastName}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">

                </span>
              </div>
              <div className="flex items-center text-xs dark:text-gray-400">
                <span>
                  {/* {new Date(article.createdAt!).toLocaleDateString()} */}
                  {post_time(article.createdAt!)}
                </span>
              </div>
            </div>

          </div>
          <dl className=" text-xs font-medium flex items-center">
            <dt className="sr-only">Reviews</dt>
            <dd className="text-xs text-indigo-600 flex items-center dark:text-indigo-400 space-x-3">
              <span className="flex space-x-1">
                <Eye className="h-4 w-4 font-bold mt-0.5" />
                <span>{article.totalViews}</span>
              </span>
              <span className='flex space-x-1'>
                <Heart className="h-4 w-4 font-bold mt-0.5" />
                <span>128</span>
              </span>
              <span className='flex space-x-1'>
                <FileText className="h-4 w-4 font-bold mt-0.5" />
                <span>128</span>
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}
export default Card;