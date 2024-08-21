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
import { useNavigate, useOutletContext } from "react-router-dom";

const categories = [
  { src: cardio, label: "Cardio" },
  { src: strength, label: "Strength" },
  { src: functional, label: "Functional" },
  { src: bodyWeight, label: "Body Weight" },
  { src: accessories, label: "Accessories" },
  { src: recovery, label: "Recovery" },
  { src: flooring, label: "Flooring" },
  { src: storage, label: "Storage" },
  { src: specialty, label: "Specialty" },
  { src: packages, label: "Gym Packages" },
];

const Category = () => {
  const { setCategory, setCheckedList } = useOutletContext();
  const navigate = useNavigate();
  const handleCategoryClick = (label) => {
    setCategory([label]);
    setCheckedList([label]);
    navigate("/products");
  };
  return (
    <div className="text-center mt-8 pt-4 rounded-md bg-gray-200 text-sm font-medium flex lg:justify-center pb-6 gap-12 overflow-y-auto px-4">
      {categories.map((category, index) => (
        <div
          onClick={() => handleCategoryClick(category.label)}
          key={index}
          className="flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:bg-gray-300 rounded-full p-2"
        >
          <img
            style={{ width: 40, marginTop: 2 }}
            src={category.src}
            alt={category.label}
          />
          <h1>{category.label}</h1>
        </div>
      ))}
    </div>
  );
};

export default Category;
