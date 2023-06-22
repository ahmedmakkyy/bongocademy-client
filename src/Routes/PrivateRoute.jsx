import { useContext } from "react";
import { AuthContext } from "../Pages/LogIn & SignUp/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";


const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location);

    if (loading){
        return <CircleLoader color="#36d7b7" />
    }
    if (user){
        return children;
    }

    return <Navigate state={{from: location}} to='/login' replace></Navigate>;
};

export default PrivateRoute;