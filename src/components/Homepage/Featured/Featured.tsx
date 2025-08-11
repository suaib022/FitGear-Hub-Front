/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useGetallProductsQuery } from "@/redux/features/product/productApi";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import FeaturedCard from "./Card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import errorImg from "../../../assets/Result/error-404.png";

const Featured = () => {
  const {
    data: products,
    isError,
    isLoading,
  } = useGetallProductsQuery({ limit: 4 });

  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8,
      },
    },
  };

  if (isLoading) {
    return (
      <Flex
        className="flex justify-center items-center mt-12"
        align="center"
        gap="middle"
      >
        <Spin
          className="inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  if (isError) {
    return <img className="h-[450px] mx-auto" src={errorImg} alt="" />;
  }

  return (
    <motion.div
      ref={ref}
      className="relative py-16 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-2xl shadow-lg overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-rose-200/30 to-blue-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.h2
        className="relative text-5xl text-center font-bold my-12 mx-auto flex pt-6 justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent"
        variants={titleVariants}
      >
        Featured Equipment
      </motion.h2>
      
      <motion.div
        className="relative grid text-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6"
        variants={gridVariants}
      >
        {products?.data.map((item: any, index: number) => (
          <motion.div
            key={item?._id}
            variants={{
              hidden: { 
                opacity: 0, 
                y: 60,
                scale: 0.8,
                rotateX: 45
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.1,
                },
              },
            }}
          >
            <FeaturedCard item={item} />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        className="relative pb-6 pt-8"
        variants={buttonVariants}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => navigate("/products")}
            className="mt-8 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 w-48 h-12 mx-auto flex items-center justify-center text-white font-semibold rounded-full shadow-lg transition-all duration-300"
          >
            <motion.span
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              Explore More
            </motion.span>
            <motion.span
              className="ml-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Featured;