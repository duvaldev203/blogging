import { Facebook, Instagram, Linkedin } from "react-feather";

const ShareArticle: React.FC = () => {
    const style = "mb-2.5 h-10 w-10 rounded-full border dark:text-slate-300 text-slate-400 border-stone-300 dark:border-stone-700 flex items-center justify-center hover:shadow-lg transition duration-1000 hover:scale-110 ease-in-out";
    return (
        <>
            <div className="pt-20 relative top-3/4 left-4 box-border z-50">
                <a href="http://" className={style + "hover:text-blue-600 dark:hover:text-blue-600 hover:border-blue-600 dark:hover:border-blue-600"}>
                    <Facebook />
                </a>
                <a href="http://" className={style + "hover:text-black hover:border-black dark:hover:text-black dark:hover:border-black"}>
                    <span className="[&>svg]:h-5 [&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 512 512">
                            <path
                                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                        </svg>
                    </span>
                </a>
                <a href="http://" className={style + "hover:text-pink-500 dark:hover:text-pink-500 hover:border-pink-500 dark:hover:border-pink-500"}>
                    <Instagram />
                </a>
                <a href="http://" className={style + "hover:text-blue-500 dark:hover:text-blue-500 hover:border-blue-500 dark:hover:border-blue-500"}>
                    <Linkedin />
                </a>
            </div>
        </>
    )
}

export default ShareArticle;