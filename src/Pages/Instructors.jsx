
import useAllInstructors from '../hooks/useAllInstructors';


const Instructors = () => {
    const [allinstructors] = useAllInstructors();
    return (
        <div>
            <div>
                <div>      
                    <h1 className="text-3xl mt-20 font-light text-center mb-8 text-yellow-500 font-serif relative">
                        Our Instructors
                        <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
                        <span className="block w-1/3 h-0.5 bg-yellow-500 mx-auto mt-2"></span>
                    </h1>
                </div>

                <div className="flex flex-wrap">
                    {allinstructors.map((instructor) => (
                        <div key={instructor.instructor_name} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
                            <div className="bg-white shadow-lg rounded-lg">
                                <img
                                    src={instructor.instructor_photo}
                                    alt={instructor.name}
                                    className="w-full h-60 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <p className="text-gray-600 mb-2">
                                        <span className='font-semibold'>Instructor:</span> {instructor.instructor_name}</p>
                                    <p className="text-gray-600 mb-4"><span className='font-semibold'>Students:</span>  {instructor.totalStudents}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Instructors;