import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EnrollDetail = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchPayments = async () => {
      if (user && user.email) {
        try {
          const response = await axiosSecure.get(`/payments?email=${user.email}`);
          if (response.status === 200) {
            setPayments(response.data);
          } else {
            console.log('Error:', response.status);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };

    fetchPayments();
  }, [axiosSecure, user]);

  return (
    <div className="w-full">
      <div>
        <h1 className="text-3xl font-light text-center mb-8 text-yellow-200 font-serif relative">
          Enrolled Classes
          <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
          <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
        </h1>
      </div>
      {payments.map((payment) => (
        <div key={payment._id}>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {payment.classes.map((classesObj, index) => (
              <div key={index} className="card m-5 w-full bg-base-100 shadow-xl image-full">
                <figure>
                  <img src={classesObj.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{classesObj.sport_name}</h2>
                  <p>You are welcome to this class. Just one step</p>
                  <p>Amount Paid: {classesObj.course_price}</p>
                  <div className="card-actions justify-end">
                    {/* Additional actions */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrollDetail;
