import img1 from "../../assets/Benefit/1.jpg";
import img2 from "../../assets/Benefit/2.jpg";
import img3 from "../../assets/Benefit/3.jpg";
import img4 from "../../assets/Benefit/4.jpg";
import img5 from "../../assets/Benefit/5.jpg";
import img6 from "../../assets/Benefit/6.jpg";

const Benefit = () => {
  return (
    <section className="py-12 bg-gray-100 text-center">
      <div className="container">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Why Our Fitness Equipment is Right for You
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <img src={img1} className="mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Built to Last</h3>
            <p className="text-gray-600 font-semibold italic">
              Our equipment is engineered for durability, ensuring it withstands
              even the toughest workouts. This means you can rely on our
              products for years to come, making it a wise investment in your
              health.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <img src={img2} alt="Durable Equipment" className="mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Customized Workouts</h3>
            <p className="text-gray-600 font-semibold italic">
              Whether you're a beginner or an expert, our range of products
              allows you to tailor your workouts to meet your specific fitness
              goals, from weight loss to muscle gain.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <img src={img3} alt="Durable Equipment" className="mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">
              Enhance Your Performance
            </h3>
            <p className="text-gray-600 font-semibold italic">
              Our equipment is designed to improve your strength, endurance, and
              flexibility, helping you achieve peak performance in your fitness
              journey.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <img src={img4} alt="Durable Equipment" className="mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">
              Convenient Home Workouts
            </h3>
            <p className="text-gray-600 font-semibold italic">
              Enjoy the convenience of working out at home with our
              space-saving, easy-to-use equipment. No need for a gym
              membership—get fit on your own schedule.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <img src={img5} alt="Durable Equipment" className="mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Injury Prevention</h3>
            <p className="text-gray-600 font-semibold italic">
              Our ergonomically designed equipment minimizes the risk of injury,
              allowing you to train safely and effectively, even during intense
              sessions.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <img src={img6} alt="Durable Equipment" className="mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">
              Boost Your Confidence
            </h3>
            <p className="text-gray-600 font-semibold italic">
              Achieve your fitness goals and feel more confident in your body
              with regular use of our high-quality equipment. Transform your
              body and mind, one workout at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
