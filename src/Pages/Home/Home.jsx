import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Winner from '../../Components/Winner/Winner';

const Home = () => {
    return (
        <div>
            <Banner/>

            {/* moost popular contest section */}

            <Winner></Winner>
        </div>
    );
};

export default Home;