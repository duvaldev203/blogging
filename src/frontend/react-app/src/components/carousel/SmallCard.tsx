import { ArticleResponse } from "../../generated";

export interface CardProps {
    article?: ArticleResponse,
}

const SmallCard: React.FC<CardProps> = (props) => {
    return (

        <div className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 max-w-xl hover:scale-105 transition-transform duration-500">
            <a href="#" className="block w-full h-full">
                <img alt="blog photo" src="/images/hero-image-01.jpg" className="object-cover w-full max-h-40" />
                <div className="w-full p-4 bg-white dark:bg-gray-800">
                    <p className="font-medium text-indigo-500 text-md">
                    </p>
                    <p className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                        New Mac is here !
                    </p>
                    <p className="font-light text-gray-400 dark:text-gray-300 text-md">
                        The new supermac is here, 543 cv and 140 000$. This is best racing computer about 7 years on...
                    </p>
                </div>
            </a>
        </div>

    )

}

export default SmallCard;