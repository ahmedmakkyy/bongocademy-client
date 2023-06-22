import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const EnrolledClasses = () => {
  const data = useLoaderData();
  const [coursePrice, setCoursePrice] = useState(data.course_price);
  const [courseName, setCourseName] = useState(data.sport_name);
  const [courseId, setCourseId] = useState(data._id);

  

  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure><img src={data.image} alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">{courseName}</h2>
        <p>You are welcome to this class. Just one step</p>
        <p>Amount To Pay: {coursePrice}</p>
        <div className="card-actions justify-end">
          <Link
            to={`/dashboard/payment?price=${coursePrice}&name=${encodeURIComponent(courseName)}&id=${courseId}`}
          >
            <button className="btn btn-primary">Pay</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrolledClasses;
