

import Slider from "../../components/Slider";
import PopularCard from "../../components/PopularCard";
import PopularInstructors from "../../components/PopularInstructors";
import Gallery from "../../components/Gallery";


const Homepage = () => {
    return (
        <div className="">
            

            <Slider></Slider>
         <PopularCard></PopularCard>
         <PopularInstructors></PopularInstructors>
         <Gallery></Gallery>
        </div>
        
    );
};

export default Homepage;