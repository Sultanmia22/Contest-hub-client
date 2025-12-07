import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Winner from '../../Components/Winner/Winner';
import Works from '../../Components/HowItWorks/Works';

const Home = () => {
    return (
        <div>
            <Banner/>

            {/* moost popular contest section */}

            <Winner></Winner>
            <Works/>
        </div>
    );
};

export default Home;