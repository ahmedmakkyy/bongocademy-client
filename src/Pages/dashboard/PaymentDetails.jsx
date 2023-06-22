import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentDetails = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchPayments = async () => {
      if (user && user.email) {
        try {
          const response = await axiosSecure.get(`/payments?email=${user.email}`);
          if (response.status === 200) {
            console.log(response.data);
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
    <div className="w-full m-5 p-2">
      <div>
        <h1 className="text-3xl font-light text-center mb-8 text-yellow-200 font-serif relative">
          Payment Details
          <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
          <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full p-2 text-sm">
          <thead>
            <tr className="bg-blue-200 text-gray-800">
              <th className="py-2 px-4">Index</th>
              <th className="py-2 px-4">Payment Amount</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Transaction ID</th>
              <th className="py-2 px-4">Enrolled Courses</th>
            </tr>
          </thead>
          <tbody className='bg-gray-800 bg-opacity-80 backdrop-blur-md'>
            {payments.map((payment, index) => (
              <tr key={payment.transactionID}>
                <td className="py-2 px-4 text-gray-100">{index + 1}</td>
                <td className="py-2 px-4 text-gray-100">{payment.price}</td>
                <td className="py-2 px-4 text-gray-100">{payment.date}</td>
                <td className="py-2 px-4 text-gray-100">{payment.transactionID}</td>
                <td className="py-2 px-4">
                  <ul className="list-disc list-inside">
                    {payment.classes.map((classesObj, index) => (
                      <p key={index} className="text-gray-100">{index+1}. {classesObj.sport_name}</p>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;
