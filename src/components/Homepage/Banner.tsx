import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Carousel } from "antd";
import { useInView } from "react-intersection-observer";
import banner1 from "../../assets/Banner/1.jpg";
import banner2 from "../../assets/Banner/2.jpg";
import banner3 from "../../assets/Banner/3.jpg";
import banner4 from "../../assets/Banner/4.jpg";
import banner5 from "../../assets/Banner/5.jpg";
import banner6 from "../../assets/Banner/6.jpg";
import banner7 from "../../assets/Banner/7.jpg";

const bannerData = [
  {
    image: banner1,
    title: "Transform Your Home Gym",
    subtitle: "Premium equipment for your ultimate home workout space"
  },
  {
    image: banner2,
    title: "Ultimate Home Gym Setup",
    subtitle: "Create your perfect workout space with premium equipment"
  },
  {
    image: banner3,
    title: "Complete Home Gym",
    subtitle: "All-in-one fitness solution for your home"
  },
  {
    image: banner4,
    title: "Rustic Gym Ambiance",
    subtitle: "Vintage-inspired gym with premium equipment"
  },
  {
    image: banner5,
    title: "Modern Fitness Haven",
    subtitle: "Stylish gym with top-notch equipment"
  },
  {
    image: banner6,
    title: "Motivational Home Gym",
    subtitle: "Inspiring space with top-tier fitness gear"
  },
  {
    image: banner7,
    title: "Vintage Fitness Space",
    subtitle: "Classic gym with timeless equipment"
  }
];

const Banner = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Carousel 
        className="banner-carousel" 
        autoplay
        autoplaySpeed={5000}
        effect="fade"
        dots={true}
        pauseOnHover={false}
      >
        {bannerData.map((banner, index) => (
          <div key={index} className="relative">
            <Parallax speed={-20} className="relative max-h-[600px] w-full">
              <motion.div
                className="relative max-h-[600px] w-full overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.img
                  className="w-full h-full object-cover transform"
                  src={banner.image}
                  alt={banner.title}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                />
                
                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                
                {/* Animated content */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-start text-left p-8 md:p-16"
                  variants={textVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <motion.h1
                    className="text-white text-3xl md:text-6xl font-bold mb-4 max-w-4xl leading-tight"
                    variants={titleVariants}
                  >
                    {banner.title}
                  </motion.h1>
                  
                  <motion.p
                    className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed"
                    variants={subtitleVariants}
                  >
                    {banner.subtitle}
                  </motion.p>
                  
                  <motion.div
                    className="mt-8"
                    variants={subtitleVariants}
                  >
                    <motion.button
                      className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Collection
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Parallax>
          </div>
        ))}
      </Carousel>
      
      {/* Floating elements for visual interest */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-16 w-6 h-6 bg-rose-400/30 rounded-full"
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
};

export default Banner;