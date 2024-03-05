import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageIllustration from "../components/PageIllustration";
import NotFoundSVG from "../images/error/not found img.svg";
import { ArrowRightCircle, Zap } from "react-feather";

const NotFound = () => {

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

            {/*  Site header */}
            <Header />

            {/*  Page content */}
            <main className="grow">

                {/*  Page illustration */}
                <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
                    <PageIllustration />
                </div>
                <section className="relative">
                    <div className='w-full h-full no-scrollbar items-center justify-center justify-content-center'>
                        <div className="no-scrollbar rounded-sm mx-[15%] my-[10%] align-items-center justify-center justify-content-center bg-slate-400 bg-opacity-20 shadow-xl shadow-graydark dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-wrap items-center h-full">
                                <div className={'h-full w-[50%] xl:block xl:w-1/2'}>
                                    <img src={NotFoundSVG} alt="Not Found Image" className="" />
                                </div>
                                <div className="hidden w-full xl:block xl:w-1/2">
                                    <div className="py-17.5 px-26 text-center">
                                        <h1 className="mb-6 px-7.5 font-semibold text-black dark:text-slate-200">
                                            OUPPS!!! Page Not Found
                                        </h1>

                                        <div >
                                            <Link
                                                to="/"
                                                className="flex items-center gap-5 hover:text-blue-200"
                                            >
                                                <div className="flex w-full flex-1 items-center justify-center py-4 font-semibold text-gray-800 dark:text-slate-200 hover:underline hover:underline-offset-4 dark:hover:text-blue-200">
                                                    <h2>
                                                        Go back to the Home
                                                    </h2>
                                                    <ArrowRightCircle className="pl-1 hover:translate-x-2" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default NotFound;