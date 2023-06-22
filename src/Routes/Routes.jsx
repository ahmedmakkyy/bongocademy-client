import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Homepage from "../Pages/Home/Homepage";
import Login from "../Pages/LogIn & SignUp/Login";
import SignUp from "../Pages/LogIn & SignUp/SignUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ClassDetail from "../Pages/classDetail/ClassDetail";

import ManageUsers from "../Pages/dashboard/ManageUsers";
import DashBoard from "../Pages/dashboard/DashBoard";
import ManageClasses from "../Pages/dashboard/ManageClasses";
import AddClass from "../Pages/dashboard/AddClass";
import MyClasses from "../Pages/dashboard/MyClasses";
import Classes from "../Pages/classes/Classes";
import Payment from "../Pages/dashboard/Payment";
import EnrolledClasses from "../Pages/dashboard/EnrolledClasses";
import SelectedClasses from "../Pages/dashboard/SelectedClasses";
import EnrollDetail from "../Pages/dashboard/EnrollDetail";
import Instructors from "../Pages/Instructors";
import PrivateRoute from "./PrivateRoute";
import PaymentDetails from "../Pages/dashboard/PaymentDetails";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>
      },
      {
        path: "allClasses",
        element: <Classes></Classes>
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "signup",
        element: <SignUp></SignUp>
      },
      {
        path: "classDetail/:id",
        element: <PrivateRoute><ClassDetail></ClassDetail></PrivateRoute> ,
        loader: ({ params }) => fetch(`https://bongo-sports-server.vercel.app/allClasses/${params.id}`)

      }
    ]
  },
  {
    path: "dashboard",
    element: <DashBoard></DashBoard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "manageClasses",
        element: <ManageClasses></ManageClasses>
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>
      },
      {
        path: "myClasses",
        element: <MyClasses></MyClasses>
      },
      {
        path: "selectedClasses",
        element: <SelectedClasses></SelectedClasses>
      },
      {
        path: "enrolledClasses/:id",
        element: <EnrolledClasses></EnrolledClasses>,
        loader: ({ params }) => fetch(`https://bongo-sports-server.vercel.app/mySelectedClass/${params.id}`)

      },
      {
        path: "payment",
        element: <Payment></Payment>
        
      },
      {
        path: "enrollDetail",
        element: <EnrollDetail></EnrollDetail>
        
      },
      {
        path: "paymentDtls",
        element: <PaymentDetails></PaymentDetails>
        
      },
    ]
  },
  
 
 
]);



export default router; 