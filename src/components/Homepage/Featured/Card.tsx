/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "antd";
import "./FeaturedCard.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const { Meta } = Card;

const FeaturedCard = ({ item }: any) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const cardVariants = {
    rest: {
      scale: 1,
      y: 0,
      rotateY: 0,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    rest: {
      scale: 1,
      filter: "brightness(1)",
    },
    hover: {
      scale: 1.1,
      filter: "brightness(1.1)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    rest: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    hover: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    rest: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="mx-auto card-container relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={cardVariants}
      initial="rest"
      animate={hovered ? "hover" : "rest"}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="relative overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm"
        hoverable={false}
        style={{ width: 280, borderRadius: 16 }}
        cover={
          <div className="relative overflow-hidden h-64">
            <motion.img
              className="w-full h-full object-cover"
              alt={item.name}
              src={item.image}
              variants={imageVariants}
            />
            
            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              variants={overlayVariants}
            />
            
            {/* Floating button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={buttonVariants}
            >
              <Button
                onClick={() => navigate(`/products/${item?._id}`)}
                className="bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white hover:text-rose-600 border-0 shadow-lg font-semibold px-6 py-2 rounded-full transition-all duration-300"
              >
                View Details
              </Button>
            </motion.div>
          </div>
        }
      >
        <motion.div
          className="p-2"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Meta 
            title={
              <motion.span
                className="text-lg font-semibold text-gray-800"
                whileHover={{ color: "#e11d48" }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.span>
            }
            description={
              <motion.div
                className="mt-2"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-rose-600 font-bold text-xl">
                  ${item.price}
                </span>
              </motion.div>
            }
          />
        </motion.div>
      </Card>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-rose-400 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default FeaturedCard;