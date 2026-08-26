import React, { useEffect, useState } from 'react';
import { FiTarget, FiClipboard, FiZap, FiCheckCircle, FiLayers, FiTool } from 'react-icons/fi';

const Works = () => {
    const [workData, setWorkData] = useState([]);

    useEffect(() => {
        fetch('/workData.json')
            .then(res => res.json())
            .then(data => setWorkData(data));
    }, []);

    const icons = [
        <FiTarget />,
        <FiClipboard />,
        <FiZap />,
        <FiCheckCircle />,
        <FiLayers />,
        <FiTool />,
    ];

    return (
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-base-100 via-base-200 to-base-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Header */}
            <div className="text-center mb-20">
                <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4 tracking-widest uppercase">
                    Simple Process
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
                    How It{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                        Works
                    </span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base md:text-lg">
                    Follow these simple steps and get started in no time. We've made it easy for you.
                </p>
            </div>

            {/* Steps */}
            <div className="max-w-5xl mx-auto relative">
                {/* Center vertical line - desktop */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/40 to-transparent z-0" />

                <div className="flex flex-col gap-16">
                    {workData.map((step, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div
                                key={idx}
                                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            >
                                {/* Card Side */}
                                <div className="w-full md:w-[45%]">
                                    <div
                                        className={`group relative bg-white dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-7 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:-translate-y-1 ${
                                            isEven ? 'md:mr-auto' : 'md:ml-auto'
                                        }`}
                                    >
                                        {/* Top Accent Bar */}
                                        <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-secondary to-accent rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Icon Box */}
                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 text-secondary text-2xl mb-5 group-hover:from-secondary group-hover:to-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                            {icons[idx] || <FiTarget />}
                                        </div>

                                        {/* Step Badge */}
                                        <span className="inline-block text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-3 tracking-wider uppercase">
                                            Step {step.num}
                                        </span>

                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Number */}
                                <div className="relative z-10 w-full md:w-[10%] flex justify-center">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-accent text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-secondary/30 ring-4 ring-white dark:ring-gray-900 transition-transform duration-300 hover:scale-110">
                                        {step.num}
                                    </div>
                                </div>

                                {/* Empty Side */}
                                <div className="hidden md:block w-[45%]" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-20">
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
                    Ready to get started?
                </p>
                <button className="px-8 py-3 bg-gradient-to-r from-secondary to-accent text-white font-semibold rounded-full shadow-lg shadow-secondary/30 hover:shadow-secondary/50 hover:scale-105 transition-all duration-300">
                    Get Started Now
                </button>
            </div>
        </section>
    );
};

export default Works;