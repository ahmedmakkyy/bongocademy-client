import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ClassDetail = () => {
    const data = useLoaderData();
    console.log(data);
    return (


        <div className="card lg:card-side bg-base-100 shadow-xl ">
            <img
                src={data.image}
                alt="Basketball"
                className="w-1/3 h-1/3 object-cover mr-6"
            />
            <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{data.sport_name}</h2>
                <p className="text-gray-600 mb-2">
                    Instructor: <span className="font-semibold">{data.instructor_name}</span>
                </p>
                <p className="text-gray-600 mb-2">
                    Course Fee: <span className="font-semibold">{data.course_price}</span>
                </p>
                <p className="text-gray-600 mb-2">
                    Available Seats: <span className="font-semibold">{data.available_seats}</span>
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Select
                </button>
            </div>
        </div>

       





    )
};

export default ClassDetail;