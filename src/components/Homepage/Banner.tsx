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
    <div>
      <img className="max-h-[500px] w-full " src={banner1} alt="" />
    </div>
    <div>
      <img className="max-h-[500px] w-full " src={banner2} alt="" />
    </div>
    <div>
      <img className="max-h-[500px] w-full " src={banner3} alt="" />
    </div>
    <div>
      <img className="max-h-[500px] w-full " src={banner4} alt="" />
    </div>
    <div>
      <img className="max-h-[500px] w-full " src={banner5} alt="" />
    </div>
    <div>
      <img className="max-h-[500px] w-full " src={banner6} alt="" />
    </div>
    <div>
      <img className="max-h-[500px] w-full " src={banner7} alt="" />
    </div>
  </Carousel>
);

export default Banner;
