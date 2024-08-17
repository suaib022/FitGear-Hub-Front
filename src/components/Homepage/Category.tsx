import cardio from "../../assets/Icons/cardio.png";
import strength from "../../assets/Icons/strength.png";
import functional from "../../assets/Icons/functional.png";
import bodyWeight from "../../assets/Icons/body-weight.png";
import accessories from "../../assets/Icons/accessories.png";
import flooring from "../../assets/Icons/flooring.png";
import storage from "../../assets/Icons/storage.png";
import recovery from "../../assets/Icons/recovery.png";
import specialty from "../../assets/Icons/specialty.png";
import packages from "../../assets/Icons/package.png";

const Category = () => {
  return (
    <div className="text-center mt-8 pt-4 rounded-md bg-gray-200 text-sm font-medium flex lg:justify-center pb-6 gap-12 overflow-y-auto px-4">
      <div className="flex flex-col justify-center items-center">
        <img style={{ maxWidth: 42 }} src={cardio} alt="" />
        <h1>Cardio</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img style={{ width: 40, marginTop: 2 }} src={strength} alt="" />
        <h1>Strength</h1>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <img style={{ width: 40, marginTop: 2 }} src={functional} alt="" />
        <h1>Functional</h1>
      </div>
      <div className="flex flex-col justify-center mt-6 lg:mt-0 items-center ">
        <img style={{ width: 40, marginTop: 2 }} src={bodyWeight} alt="" />
        <h1 className="text-sm font-medium text-center">Body Weight</h1>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <img style={{ width: 40, marginTop: 2 }} src={accessories} alt="" />
        <h1>Accessories</h1>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <img style={{ width: 40, marginTop: 2 }} src={recovery} alt="" />
        <h1>Recovery</h1>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <img style={{ width: 40, marginTop: 2 }} src={flooring} alt="" />
        <h1>Flooring</h1>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <img style={{ width: 40, marginTop: 2 }} src={storage} alt="" />
        <h1>Storage</h1>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <img style={{ width: 40, marginTop: 2 }} src={specialty} alt="" />
        <h1>Specialty</h1>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <img style={{ width: 40, marginTop: 2 }} src={packages} alt="" />
        <h1>Packages</h1>
      </div>
    </div>
  );
};

export default Category;
