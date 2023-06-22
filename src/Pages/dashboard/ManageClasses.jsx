import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageClasses = () => {
    
  const { data: classes = [], refetch } = useQuery(['classes'], async () => {
    const res = await fetch('https://bongo-sports-server.vercel.app/myClasses')
    return res.json();
})

  const handleApprove = classes => {
    fetch(`https://bongo-sports-server.vercel.app/classes/statusApprove/${classes._id}`, {
        method: 'PATCH'
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        refetch();
    } )
  }
  const handleDeny = classes => {
    fetch(`https://bongo-sports-server.vercel.app/classes/statusDeny/${classes._id}`, {
        method: 'PATCH'
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        refetch();
    } )
  }
    return (
        <div className="w-full  p-4">
      <div>
        <h1 className="text-3xl font-light text-center mb-8 text-yellow-200 font-serif relative">
          Manage Classes
          <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
          <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
        </h1>
      </div>
      <div className="flex flex-wrap">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="px-4 py-2">Sport Name</th>
              <th className="px-4 py-2">Instructor</th>
              <th className="px-4 py-2">E-mail</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Available Seats</th>
              <th className="px-4 py-2">Course Fee</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id} className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg text-white">
                <td className="px-4 py-2">{classItem.sport_name}</td>
                <td className="px-4 py-2">{classItem.instructor_name}</td>
                <td className="px-4 py-2">{classItem.instructor_email}</td>
                <td className="px-4 py-2 ">{classItem.status}</td>
                <td className="px-4 py-2">{classItem.available_seats}</td>
                <td className="px-4 py-2">{classItem.course_price}</td>
                <td className="px-4 py-2">
                  {classItem.status === 'Approve' ? (
                    <div className="flex gap-2">
                      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" disabled>
                        Approved
                      </button> 
                    </div>
                  ) : 
                  
                  (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(classItem)}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeny(classItem)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Deny
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageClasses;