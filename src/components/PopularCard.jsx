import { Link } from "react-router-dom";
import usePopular from "../hooks/usePopular";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
const Popularclasses = () => {
    useEffect(() => {
        Aos.init();
    }, [])
    const [classes] = usePopular();
    console.log(classes);
    return (
        <div className="mt-4" data-aos="fade-down">
            <div>

                <h1 className="text-3xl font-light text-center mb-8 text-yellow-500 font-serif relative">
                    Popular Courses
                    <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
                    <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
                </h1>

            </div>
          
            <div className="flex flex-wrap">
                {classes.map((classes) => (
                    <div key={classes._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 ">
                        <div className="card  w-80 bg-base-100 shadow-xl image-full">
                            <figure><img src={classes.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title font-mono">{classes.sport_name}</h2>
                                <p> <span className="font-semibold ">Instructor: </span> {classes.instructor_name}</p>
                                <p> <span className="font-semibold">Availble Seats: </span>{classes.available_seats}</p>
                                <p> <span className="font-semibold">Enrolled: </span>{classes.enrolled}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn glass text-white">Detail</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Popularclasses;