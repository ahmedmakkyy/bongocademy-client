import React, { useContext } from 'react';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaBeer, FaBook, FaChalkboard, FaHandPointer, FaPlus, FaUsers, FaListUl, FaPaypal, FaHome, FaSignOutAlt, FaFootballBall } from 'react-icons/fa'
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import logo from '../../../src/assets/logo.png'
const DashBoard = () => {
  
  const{user,logOut}=useContext(AuthContext)

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => { console.log(error); })
  }
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  return (

    <div className="drawer lg:drawer-open">
     
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu gap-4 p-4 w-80 h-full bg-gradient-to-r from-gray-700 to-gray-600 text-base-content">
          {/* Sidebar content here */}
          <img src={logo} alt="" />
          <div className="divider"></div> 
          {isAdmin ?
          (<>
           <li><NavLink to='/dashboard/manageClasses'><FaChalkboard></FaChalkboard> Mangage Classes</NavLink></li>
           <li><NavLink to='/dashboard/manageUsers' > <FaUsers></FaUsers>Manage Users</NavLink></li>
           <div className="divider"></div> 
           <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
       <li onClick={handleLogOut}><NavLink to='/'><FaSignOutAlt></FaSignOutAlt>Logout</NavLink></li>
           </>)
          : isInstructor ?
          (<>
           <li><NavLink to='/dashboard/myClasses'><FaBook></FaBook>My Classes</NavLink></li>
           <li><NavLink to='/dashboard/addClass'><FaPlus></FaPlus> Add Classes</NavLink></li>
           <div className="divider"></div> 
           <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
       <li onClick={handleLogOut}><NavLink to='/'><FaSignOutAlt></FaSignOutAlt>Logout</NavLink></li>
           </>)
          :
          (<>
           <li><NavLink to='/dashboard/selectedClasses'><FaHandPointer></FaHandPointer>My Selected Classes</NavLink></li>
           <li><NavLink to='/dashboard/enrollDetail'><FaFootballBall></FaFootballBall>
            
            Enorlled Classes</NavLink></li>
           {/* <li><NavLink to='/dashboard/enrolledClass'>My Enrolled Classes</NavLink></li> */}
           <li><NavLink to='/dashboard/payment'><FaPaypal></FaPaypal>Payment</NavLink></li>
           <li><NavLink to='/dashboard/paymentDtls'><FaListUl></FaListUl> Payment Details</NavLink></li>
           <div className="divider"></div> 
           <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
       <li onClick={handleLogOut}><NavLink to='/'><FaSignOutAlt></FaSignOutAlt>Logout</NavLink></li>
           </>)
          }
       
       
        </ul>

      </div>
      
    </div>
    
  );
};

export default DashBoard;
