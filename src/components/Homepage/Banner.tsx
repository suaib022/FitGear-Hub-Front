import { Carousel } from "antd";
import banner1 from "../../assets/Banner/1.jpg";
import banner2 from "../../assets/Banner/2.jpg";
import banner3 from "../../assets/Banner/3.jpg";
import banner4 from "../../assets/Banner/4.jpg";
import banner5 from "../../assets/Banner/5.jpg";
import banner6 from "../../assets/Banner/6.jpg";
import banner7 from "../../assets/Banner/7.jpg";

const Banner = () => (
  <Carousel className="" autoplay>
    <div className="relative max-h-[500px] w-full">
      <img
        className="w-full h-full object-cover"
        src={banner1}
        alt="Transform Your Home Gym"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
          Transform Your Home Gym
        </h1>
        <p className="text-white text-sm md:text-lg">
          Premium equipment for your ultimate home workout space
        </p>
      </div>
    </div>

    <div className="relative max-h-[500px] w-full">
      <img
        className="w-full h-full object-cover"
        src={banner2}
        alt="Ultimate Home Gym Setup"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
          Ultimate Home Gym Setup
        </h1>
        <p className="text-white text-sm md:text-lg">
          Create your perfect workout space with premium equipment
        </p>
      </div>
    </div>

    <div className="relative max-h-[500px] w-full">
      <img
        className="w-full h-full object-cover"
        src={banner3}
        alt="Complete Home Gym"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
          Complete Home Gym
        </h1>
        <p className="text-white text-sm md:text-lg">
          All-in-one fitness solution for your home
        </p>
      </div>
    </div>

    <div className="relative max-h-[500px] w-full">
      <img
        className="w-full h-full object-cover"
        src={banner4}
        alt="Rustic Gym Ambiance"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
          Rustic Gym Ambiance
        </h1>
        <p className="text-white text-sm md:text-lg">
          Vintage-inspired gym with premium equipment
        </p>
      </div>
    </div>

    <div className="relative max-h-[500px] w-full">
      <img
        className="w-full h-full object-cover"
        src={banner5}
        alt="Modern Fitness Haven"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
          Modern Fitness Haven
        </h1>
        <p className="text-white text-sm md:text-lg">
          Stylish gym with top-notch equipment
        </p>
      </div>
    </div>

    <div className="relative max-h-[500px] w-full">
      <img
        className="w-full h-full object-cover"
        src={banner6}
        alt="Motivational Home Gym"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
          Motivational Home Gym
        </h1>
        <p className="text-white text-sm md:text-lg">
          Inspiring space with top-tier fitness gear
        </p>
      </div>
    </div>

    <div className="relative max-h-[500px] w-full">
      <img
        className="w-full h-full object-cover"
        src={banner7}
        alt="Vintage Fitness Space"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
          Vintage Fitness Space
        </h1>
        <p className="text-white text-sm md:text-lg">
          Classic gym with timeless equipment
        </p>
      </div>
    </div>
  </Carousel>
);

export default Banner;
