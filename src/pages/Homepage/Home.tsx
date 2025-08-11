import { useEffect } from "react";
import { motion } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";
import Banner from "@/components/Homepage/Banner";
import Benefit from "@/components/Homepage/Benefit";
import Category from "@/components/Homepage/Category";
import Featured from "@/components/Homepage/Featured/Featured";
import ImageGallery from "@/components/Homepage/ImageGallery/ImageGallery";

const Home = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <ParallaxProvider>
      <motion.div
        className="overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={sectionVariants}>
          <Banner />
        </motion.section>
        
        <motion.section 
          variants={sectionVariants}
          className="relative z-10"
        >
          <Category />
        </motion.section>
        
        <motion.section 
          variants={sectionVariants}
          className="relative z-10"
        >
          <Featured />
        </motion.section>
        
        <motion.section 
          variants={sectionVariants}
          className="relative z-10"
        >
          <Benefit />
        </motion.section>
        
        <motion.section 
          variants={sectionVariants}
          className="relative z-10"
        >
          <ImageGallery />
        </motion.section>
      </motion.div>
    </ParallaxProvider>
  );
};

export default Home;