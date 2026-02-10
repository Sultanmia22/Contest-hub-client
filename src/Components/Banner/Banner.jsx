import { useEffect, useRef, useState } from "react";
import bannerImg from "../../assets/banner.png";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Banner = () => {

    const axiosSecure = useAxiosSecure()
    const [searchText, setSearchText] = useState('')
    const [types, setTypes] = useState('')
    const [show, setShow] = useState(false)




    const { data: searchContest = [] } = useQuery({
        queryKey: ['searchContest', types],
        queryFn: async () => {
            const result = await axiosSecure.get(`/searchContest?type=${types}`);
            return result.data
        }
    })

    // console.log(searchContest)

    const handleSearch = async (text) => {
        if (text === '') {
            return toast.error('Please fill input field')
        }

        setTypes(text)

        if (!searchContest) {
            setShow(false)
            return
        }

        setShow(true)
        setSearchText('')

    }



    return (
        <div>
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] w-full pt-5">

                <img
                    src={bannerImg}
                    alt="Banner"
                    className="h-full w-full object-cover"
                />


                <div className="absolute  inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                        Showcase Your Talent
                    </h1>
                    <p className="mt-3 max-w-xl text-sm sm:text-base md:text-lg">
                        Join thousands of creators and compete to win amazing prizes
                    </p>

                {/*     <div className="relative pt-2 flex flex-col md:flex-row gap-2">

                        <div className="flex items-center">
                            <label className="input">
                                <svg className="h-[1em] opacity-50 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} required placeholder="Search by contest types" className="placeholder:text-gray-500 text-primary" />
                            </label>
                            <button onClick={() => handleSearch(searchText)} className="btn btn-primary dark:text-gray-950"> Search </button>
                        </div>

                        {
                            show === true &&


                            <div  className="  absolute top-[80px] bg-secondary md:p-5 rounded-xl grid grid-cols-1 gap-2 z-30">
                                {
                                    searchContest?.map(contest =>
                                        <div className="bg-primary md:p-4 shadow rounded-md">
                                            <Link to={`/contest/details/${contest?._id}`} className="flex items-center gap-3">
                                                <div> <img src={contest?.contestImage} alt="" className="w-12 h-12 rounded-xl" /> </div>
                                                <div className="text-start">
                                                    <h2 className="text-sm">{contest?.contestName}</h2>
                                                    <span className="text-sm text-primary font-medium text-start px-1 py-0.5 bg-green-300 rounded-full">Video Editing</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }

                            </div>

                        }
                    </div> */}
                </div>
            </div>



        </div>
    );
};

export default Banner;