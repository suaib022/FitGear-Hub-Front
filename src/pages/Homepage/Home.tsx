import Banner from "@/components/Homepage/Banner";
import Category from "@/components/Homepage/Category";
import Featured from "@/components/Homepage/Featured/Featured";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <div className="border mt-8 border-red-500">
        <Category />
      </div>
      <Featured />
    </div>
  );
};

export default Home;
