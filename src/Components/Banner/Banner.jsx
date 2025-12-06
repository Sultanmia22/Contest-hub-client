import bannerImg from "../../assets/banner.png";

const Banner = () => {
    return (
        <div>
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] w-full pt-5">

                <img
                    src={bannerImg}
                    alt="Banner"
                    className="h-full w-full object-cover"
                />


                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                        Showcase Your Talent
                    </h1>
                    <p className="mt-3 max-w-xl text-sm sm:text-base md:text-lg">
                        Join thousands of creators and compete to win amazing prizes
                    </p>

                    <div className="pt-2 flex flex-col md:flex-row gap-2">
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
                            <input type="text" required placeholder="Search works by contest" className="placeholder:text-gray-500" />
                        </label>
                        <button className="btn btn-primary"> Search </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;