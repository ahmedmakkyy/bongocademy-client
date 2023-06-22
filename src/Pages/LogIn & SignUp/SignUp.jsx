import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { createUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    const { name, photo, email, password } = data;
    setError('');
    if (!/(?=.*[A-Z])/.test(password)) {
      setError('Please add at least one uppercase alphabetical character.');
      return;
    } else if (password.length < 6) {
      setError('Password must be 6 characters long');
      return;
    } else {
      setSuccess('Registration Successful.');
    }

    try {
      const result = await createUser(email, password);
      const createdUser = result.user;
      updateUserData(createdUser, name, photo);
      const saveUser = { name: name, email: email, role: 'student' };
      const response = await fetch('https://bongo-sports-server.vercel.app/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(saveUser),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = (user, name, photo) => {
    updateProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        console.log('user updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-20">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Sign up for an account
        </h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  {...register('name')}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Photo Url
              </label>
              <div className="mt-1">
                <input
                  id="photo"
                  name="photo"
                  type="text"
                  {...register('photo')}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...register('email', { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 font-medium">Email is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  {...register('password', { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 font-medium">Password is required.</p>
              )}
            </div>
            <div>
              <button type="submit" className="btn btn-primary w-full">
                Sign up
              </button>
            </div>
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-success font-medium">{success}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
