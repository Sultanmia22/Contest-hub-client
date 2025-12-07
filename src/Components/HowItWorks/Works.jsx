import React, { useEffect, useState } from 'react';

const Works = () => {
    const [workData, setWorkData] = useState([])

    useEffect(() => {
        fetch('/workData.json')
            .then(res => res.json())
            .then(data => {
                setWorkData(data)
            })
    }, [])

    return (
        <div className='bg-primary md:py-30 rounded-xl'>
            <h2 className='text-4xl font-bold text-center mb-10 text-secondary'> How It Work </h2>
            <div className='grid grid-cols-1 gap-5'>
                {
                    workData.map((step, idx) =>

                        <div key={idx} className={`text-center p-6 rounded-lg shadow-lg  md:w-[1000px] mx-auto dark:bg-gray-700 bg-white border-2 border-primary`}>
                            <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                {step.num}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className={`text-sm darK:text-gray-300  text-gray-600`}>{step.desc}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Works;