import Banner from "@/components/Homepage/Banner";
import Benefit from "@/components/Homepage/Benefit";
import Category from "@/components/Homepage/Category";
import Featured from "@/components/Homepage/Featured/Featured";
import ImageGallery from "@/components/Homepage/ImageGallery";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Category />
      <Featured />
      <Benefit />
      <ImageGallery />
    </div>
  );
};

export default Home;
