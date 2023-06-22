import React, { useContext, useState } from 'react';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const AddClass = () => {
    const { user } = useContext(AuthContext)
    const [sport_name, setSport_name] = useState('');
    const [image, setImage] = useState('');
    const [instructor_email, setInstructor_email] = useState('');
    const [instructor_name, setInstructor_name] = useState('');
    const [available_seats, setAvailable_seats] = useState();
    const [course_price, setCourse_price] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            sport_name,
            image,
            instructor_name: user?.displayName,
            instructor_email: user?.email,
            instructor_photo: user?.photoURL,
            available_seats,
            course_price,
            status: 'Pending',
            enrolled: 0
        };


        fetch('https://bongo-sports-server.vercel.app/allClasses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSport_name('');
                setImage('');
                setInstructor_name('');
                setInstructor_email('');
                setAvailable_seats('');
                setCourse_price('');

                if(data.insertedId){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your class has been submitted. Wait for approval.',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };



    return (
        <div className="w-full m-10 p-10">
            
            <div className="p-4 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg">
                <form onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold text-gray-300'>Add a new class</h1>
                    <div className="my-4">
                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="class-name">Class Name:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="class-name"
                            type="text"
                            placeholder="Enter class name"
                            value={sport_name}
                            onChange={(e) => setSport_name(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="class-image">Class Image URL:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="class-image"
                            type="text"
                            placeholder="Enter class image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="instructor-name">Instructor Name:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="instructor-name"
                            type="text"
                            placeholder="Enter instructor name"
                            value={user ? user.displayName : ''}
                            onChange={(e) => setInstructor_name(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="instructor-email">Instructor Email:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="instructor-email"
                            type="email"
                            placeholder="Enter instructor email"
                            value={user.email}
                            onChange={(e) => setInstructor_email(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="available-seats">Available Seats:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="available-seats"
                            type="number"
                            placeholder="Enter available seats"
                            value={available_seats}
                            onChange={(e) => setAvailable_seats(parseInt(e.target.value, 10))}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="course-fee">Course Fee:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="course-fee"
                            type="number"
                            placeholder="Enter course fee"
                            value={course_price}
                            onChange={(e) => setCourse_price(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;