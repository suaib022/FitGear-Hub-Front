import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Parallax } from "react-scroll-parallax";
import img1 from "../../assets/Benefit/1.jpg";
import img2 from "../../assets/Benefit/2.jpg";
import img3 from "../../assets/Benefit/3.jpg";
import img4 from "../../assets/Benefit/4.jpg";
import img5 from "../../assets/Benefit/5.jpg";
import img6 from "../../assets/Benefit/6.jpg";

const benefits = [
  {
    image: img1,
    title: "Built to Last",
    description: "Our equipment is engineered for durability, ensuring it withstands even the toughest workouts. This means you can rely on our products for years to come, making it a wise investment in your health."
  },
  {
    image: img2,
    title: "Customized Workouts",
    description: "Whether you're a beginner or an expert, our range of products allows you to tailor your workouts to meet your specific fitness goals, from weight loss to muscle gain."
  },
  {
    image: img3,
    title: "Enhance Your Performance",
    description: "Our equipment is designed to improve your strength, endurance, and flexibility, helping you achieve peak performance in your fitness journey."
  },
  {
    image: img4,
    title: "Convenient Home Workouts",
    description: "Enjoy the convenience of working out at home with our space-saving, easy-to-use equipment. No need for a gym membership—get fit on your own schedule."
  },
  {
    image: img5,
    title: "Injury Prevention",
    description: "Our ergonomically designed equipment minimizes the risk of injury, allowing you to train safely and effectively, even during intense sessions."
  },
  {
    image: img6,
    title: "Boost Your Confidence",
    description: "Achieve your fitness goals and feel more confident in your body with regular use of our high-quality equipment. Transform your body and mind, one workout at a time."
  }
];

const Benefit = () => {
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
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
      },
    },
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-200/20 to-blue-200/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        ref={ref}
        className="container relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Parallax speed={-5}>
          <motion.h2
            className="text-5xl font-bold mb-16 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent"
            variants={titleVariants}
          >
            Why Our Fitness Equipment is Right for You
          </motion.h2>
        </Parallax>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                whileHover={{
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Card background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="mb-6 overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ 
                        filter: "brightness(1.1) contrast(1.1)",
                      }}
                    />
                  </motion.div>
                  
                  <motion.h3
                    className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-rose-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {benefit.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-gray-600 font-medium italic leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {benefit.description}
                  </motion.p>
                </div>
                
                {/* Decorative corner element */}
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-rose-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Benefit;