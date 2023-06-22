import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const MyClasses = () => {
    const {user} = useContext(AuthContext)
  const [classes, setClasses] = useState([]);
  
  const url = `https://bongo-sports-server.vercel.app/myClasses?instructor_email=${user?.email}`
  useEffect(() => {
    
    fetch(url)
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => console.error('Error:', error));
  }, [url]);

  return (
    <div className='w-full'>
    <div>
    <h1 className="text-3xl font-light text-center mb-8 text-yellow-200 font-serif relative">
                    My Classes
                    <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
                    <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
                </h1>
    </div>
    <div className="flex flex-wrap">
        {classes.map((classes) => (
            <div key={classes._id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-4">
                <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg">
                    <img
                        src={classes.image}
                        alt={classes.title}
                        className="w-full h-60 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-2 text-gray-100">{classes.sport_name}</h2>
                        <p className="text-gray-100 mb-2 text-sm font-semibold">Students: {classes.available_seats}</p>
                        <p className="text-gray-100 mb-5 text-sm font-semibold">Course Fee: {classes.course_price}</p>
                        
                        {classes.status === 'Pending' ? (
                            <p className="text-gray-100 text-sm font-bold">Feedback: <br /> <span className='text-warning font-semibold'>Your Class is pednding.</span></p>
                        ) : (

                            <p className="text-gray-100 text-sm font-bold">Feedback: <br /> <span className='text-success font-semibold'>Your Class has been approved by Admin</span></p>
                            
                        )}
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
  );
};

export default MyClasses;
