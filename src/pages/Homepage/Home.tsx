import Banner from "@/components/Homepage/Banner";
import Category from "@/components/Homepage/Category/Category";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <div className="border mt-8 border-red-500">
        <Category />
      </div>
    </div>
  );
};

export default Home;
