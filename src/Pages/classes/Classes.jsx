import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import Swal from 'sweetalert2';

const Classes = () => {
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const navigate = useNavigate();

  useEffect(() => {
    const url = 'https://bongo-sports-server.vercel.app/allApprovedClasses';

    fetch(url)
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => {
        if (error instanceof Error && error.name === 'AbortError') {
          // Request was cancelled, no need to handle the error
          return;
        }
        console.error('Error:', error);
        navigate('/login'); // Redirect to the login page on error
      });
  }, [navigate]);

  const handleSelect = (user, classes) => {
    if (!user) {
      navigate('/login', { state: { from: location }, replace: true });
      return null;
    }

    const classData = {
      select_id: classes._id,
      sport_name: classes.sport_name,
      image: classes.image,
      student_email: user?.email,
      instructor_name: classes.instructor_name,
      instructor_email: classes.instructor_email,
      instructor_photo: classes.instructor_photo,
      available_seats: classes.available_seats,
      course_price: classes.course_price,
      enrolled: classes.enrolled,
    };

    fetch('https://bongo-sports-server.vercel.app/allSelectedClasses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Class has been selected',
            showConfirmButton: false,
            timer: 200,
          });
        }
      })

  };



  return (
    <div className="">
      <div>

        <h1 className="text-3xl mt-20 font-light text-center mb-8 text-yellow-500 font-serif relative">
          All Classes
          <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
          <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
        </h1>

      </div>
      <div className="flex flex-wrap">
        {classes.map((classes) => (
          <div key={classes._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
            <div className="shadow-lg rounded-lg bg-white">
              <img
                src={classes.image}
                alt={classes.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{classes.sport_name}</h2>
                <p className="text-gray-600 mb-2">Instructor: {classes.instructor_name}</p>
                <p className="text-gray-600 mb-2">Enrolled: {classes.enrolled}</p>
                <p className="text-gray-600 mb-4">Available Seats: {classes.available_seats}</p>
                <p className="text-gray-600">Course Fee: {classes.course_price}</p>
                {isAdmin || isInstructor ? (
                  // Render a message or other content for isAdmin and isInstructor users
                  <p className="text-gray-600">You cannot select this class as an admin or instructor.</p>
                ) : classes.available_seats === 0 ? (
                  <button
                    className="btn btn btn-active btn-disabled my-2"
                    disabled={true}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Seat Full
                  </button>
                ) : (
                  <>
                    {/* Add your custom logic here for user selection */}
                    {(
                      <button
                        className="btn btn btn-active btn-neutral my-2"
                        onClick={() => handleSelect(user, classes)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Select Class
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Classes;
