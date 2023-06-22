import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePopularInsturctors from '../hooks/usePopularInsturctors';
import Aos from 'aos';
import 'aos/dist/aos.css'


const PopularInstructors = () => {
  useEffect(() => {
    Aos.init();
}, [])
    const [instructors] = usePopularInsturctors();
    return (
        <div className="mt-4" data-aos="fade-up">
        <div>
          <h1 className="text-3xl font-light text-center mb-8 text-yellow-500 font-serif relative">
            Popular Instructors
            <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
            <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
          </h1>
          <div className="flex flex-wrap">
            {instructors.map((instructor) => (
              <div key={instructor.instructor_name} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
                <div className="relative">
                  <img
                    src={instructor.instructor_photo}
                    alt={instructor.name}
                    className="w-full h-60 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
                  <div className="absolute bottom-0 left-0 px-4 w-full h-1/3 flex flex-col justify-end text-white">
                    <p className="text-gray-200 mb-2">
                      <span className="font-semibold">Instructor:</span> {instructor.instructor_name}
                    </p>
                    <p className="text-gray-200 mb-4">
                      <span className="font-semibold">Students:</span> {instructor.totalStudents}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default PopularInstructors;