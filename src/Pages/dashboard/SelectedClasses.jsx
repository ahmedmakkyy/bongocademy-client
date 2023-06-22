import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const SelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchSelectedClasses = async () => {
      if (user && user.email) {
        const url = `https://bongo-sports-server.vercel.app/mySelectedClasses?student_email=${user.email}`;

        try {
          const response = await axiosSecure.get(url);
          if (response.status === 200) {
            const data = response.data;
            setSelectedClasses(data);
          } else {
            console.log('Error:', response.status);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };

    fetchSelectedClasses();
  }, [axiosSecure, user]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = selectedClasses.reduce(
        (accumulator, currentClass) => accumulator + parseFloat(currentClass.course_price),
        0
      );
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [selectedClasses]);

  const handleDelete = (selectId) => {

    

  
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bongo-sports-server.vercel.app/mySelectedClasses/${selectId}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0){
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              
            }
            setSelectedClasses(prevState => prevState.filter(item => item.select_id !== selectId));
           
            
          })
          .catch(error => {
            console.error('Error:', error);
           
          });
        
    
      }
    })
  
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-light text-center mb-4 text-yellow-500 font-serif relative">
          Selected Classes
          <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
          <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
        </h1>
      </div>
      <div className="p-4 flex justify-end">
        <h3 className="text-lg font-bold">Total Price: {totalPrice}</h3>
        <Link to={`/dashboard/payment?price=${totalPrice}`} className="ml-4">
          <button className="btn btn-primary">Pay</button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-4">#</th>
            <th className="p-4">Sport Name</th>
            <th className="p-4">Instructor</th>
            <th className="p-4">Enrolled Students</th>
            <th className="p-4">Course Fee</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedClasses.map((classes, index) => (
            <tr key={classes._id} className="border-b">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{classes.sport_name}</td>
              <td className="p-4">{classes.instructor_name}</td>
              <td className="p-4">{classes.enrolled}</td>
              <td className="p-4">{classes.course_price}</td>
              <td className="p-4">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(classes.select_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedClasses;
