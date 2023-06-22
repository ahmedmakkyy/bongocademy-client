import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUserSecret, FaUserShield } from 'react-icons/fa';

const ManageUsers = () => {

    
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://bongo-sports-server.vercel.app/users')
        return res.json();
    })

    const handleMakeAdmin = user => {
        fetch(`https://bongo-sports-server.vercel.app/users/role/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            refetch();
        } )
    }
    
    const handleMakeInstructor = user => {
        fetch(`https://bongo-sports-server.vercel.app/users/istructor/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            refetch();
        } )

       
    }

 
    return (
        <div>
      <h1 className="text-3xl font-light text-center mb-8 text-yellow-200 font-serif relative">
        User Management
        <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
        <span className="block w-1/3 h-0.5 bg-yellow-200 mx-auto mt-2"></span>
      </h1>
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full text-xs">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className='bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg text-white'>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="flex gap-2">
                    <>
                      {user.role === 'admin' ? (
                        <button className="btn btn-success disabled:opacity-75">
                          <FaUserSecret />
                        </button>
                      ) : (
                        <button
                          className="btn btn-ghost bg-red-600 text-white"
                          onClick={() => handleMakeAdmin(user)}
                        >
                          <FaUserSecret />
                        </button>
                      )}
                    </>
                    <>
                      {user.role === 'instructor' ? (
                        <button className="btn btn-success disabled:opacity-75 text-white">
                          <FaUserShield />
                        </button>
                      ) : (
                        <button
                          className="btn btn-ghost bg-red-600 text-white"
                          onClick={() => handleMakeInstructor(user)}
                        >
                          <FaUserShield />
                        </button>
                      )}
                    </>
                  </td>
    
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
    );
};

export default ManageUsers;