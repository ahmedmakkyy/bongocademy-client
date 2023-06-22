import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div id="error-page" className="flex justify-center content-center">
         
          <img src="./360_F_388638369_wSBADhKfhiTx6Q5Pz1xfdpy6zotku1Sg.jpg" alt="" />
        </div>
    );
};

export default ErrorPage;