import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
const Gallery = () => {
    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24" data-aos="fade-down">
            <div>

                <h1 className="text-3xl font-light text-center mb-8 text-yellow-500 font-serif relative">
                    Image Gallery
                    <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
                    <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
                </h1>

            </div>
            <div className="-m-1 flex flex-wrap md:-m-2">
                <div className="flex w-1/2 flex-wrap">
                    <div className="w-1/2 p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-1.jpg" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-2.jpg" />
                    </div>
                    <div className="w-full p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-3.jpg" />
                    </div>
                </div>
                <div className="flex w-1/2 flex-wrap">
                    <div className="w-full p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-4.jpg" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-5.jpg" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-6.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;