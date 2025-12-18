import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Winner from '../../Components/Winner/Winner';
import Works from '../../Components/HowItWorks/Works';
import Popular from '../../Components/PopularContest/Popular';

const Home = () => {
    return (
        <div>
            <Banner/>

           <Popular/>

            <Winner></Winner>
            <Works/>
        </div>
    );
};

export default Home;