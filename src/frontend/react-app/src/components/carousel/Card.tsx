import { Twitter, Instagram, Facebook, Heart } from "react-feather";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="images/hero-image-01.jpg" alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="flex space-x-4">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <dl className=" text-xs font-medium flex items-center row-start-2">
            <dt className="sr-only">Reviews</dt>
            <dd className="text-sm text-indigo-600 flex items-center dark:text-indigo-400 space-x-1 mb-3">
              <Heart className="h-4 w-4 font-bold"/>
              <span>128</span>
            </dd>
          </dl>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pb-2">
        <Link title="Partager" to='/twitter' target="_blank" className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 text-blue-600 hover:text-gray-700 dark:hover:text-gray-200"><Twitter /></Link>
        <Link title='partager' to='/facebook' target="_blank" className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 text-blue-600 hover:text-gray-700 dark:hover:text-gray-200"><Facebook /></Link>
        <Link title='partager' to='/instagram' target="_blank" className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 text-blue-600 hover:text-gray-700 dark:hover:text-gray-200"><Instagram /></Link>
      </div>
    </div>
  )
}
export default Card;