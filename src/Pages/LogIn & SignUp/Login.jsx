import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider/AuthProvider';
import app from '../../firebase/firebase.config';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log('login page location:', location);
  const from = location.state?.from?.pathname || '/';
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const { register, handleSubmit } = useForm();

  const handleLogIn = async (data) => {
    const { email, password } = data;

    console.log(email, password);

    try {
      const result = await signIn(email, password);
      const userLogged = result.user;
      console.log(userLogged);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.message) {
        setError('User not found');
      }
    }
  };

  // Google Login

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
        const saveUser = { name: loggedUser.displayName, email: loggedUser.email, role: 'student' };

        fetch('https://bongo-sports-server.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log('error', error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        

        <div className="mt-8 bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(handleLogIn)}>
          <h2 className="text-3xl font-extrabold text-center text-gray-900">Login</h2>
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
                  className="input input-bordered w-full"
                  {...register('email')}
                />
              </div>
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
                  autoComplete="current-password"
                  required
                  className="input input-bordered w-full"
                  {...register('password')}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-full">
                Log in
              </button>
            </div>
            <div className="flex items-center justify-center mb-5">
            <span
              className="bg-red-500 rounded-full hover:bg-red-600 text-white font-bold py-4 px-4 rounded-5"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle></FaGoogle>
            </span>
          </div>
          <div>
            <p>
              Not have an account? Please <Link className="text-blue-600" to="/signup">SignUp</Link>
            </p>
          </div>
          </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default Login;
