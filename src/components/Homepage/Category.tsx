/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  { src: cardio, label: "Cardio", value: "Cardio" },
  { src: strength, label: "Strength", value: "Strength" },
  { src: functional, label: "Functional", value: "Functional" },
  { src: bodyWeight, label: "Body Weight", value: "BodyWeight" },
  { src: accessories, label: "Accessories", value: "Accessories" },
  { src: recovery, label: "Recovery", value: "Recovery" },
  { src: flooring, label: "Flooring", value: "Flooring" },
  { src: storage, label: "Storage", value: "Storage" },
  { src: specialty, label: "Specialty", value: "Specialty" },
  { src: packages, label: "Gym Packages", value: "GymPackages" },
];

const Category = () => {
  const { setCategory, setCheckedList } = useOutletContext<any>();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleCategoryClick = (value: string) => {
    setCategory([value]);
    setCheckedList([value]);
    navigate("/products");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative py-12 mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl" />
      
      <motion.div
        className="relative text-center pt-4 rounded-2xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 text-sm font-medium flex lg:justify-center pb-6 gap-8 overflow-x-auto px-6 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            onClick={() => handleCategoryClick(category.value)}
            className="flex flex-col justify-center items-center min-w-[80px] cursor-pointer group"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1,
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative p-4 rounded-2xl bg-white shadow-md group-hover:shadow-xl transition-all duration-300"
              whileHover={{
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fef2f2",
              }}
            >
              <motion.img
                style={{ width: 48, height: 48 }}
                src={category.src}
                alt={category.label}
                className="transition-all duration-300 group-hover:scale-110"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            
            <motion.h1
              className="mt-3 font-semibold text-gray-700 group-hover:text-rose-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {category.label}
            </motion.h1>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Floating background elements */}
      <motion.div
        className="absolute top-4 left-8 w-3 h-3 bg-rose-300/40 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-8 right-12 w-2 h-2 bg-blue-300/40 rounded-full"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </motion.div>
  );
};

export default Category;