import "./aboutUs.css";

import { useState } from "react";
import {
  description1,
  description2,
  description3,
  description4,
  description5,
  teamMembers,
} from "./aboutUsConstants";
import Testimonials from "./testomonials";
import ContactUs from "./contactUs";

const AboutUs = () => {
  const descriptions = [
    description1,
    description2,
    description3,
    description4,
    description5,
  ];

  const [showFullDescription, setShowFullDescription] = useState(
    new Array(descriptions.length).fill(false)
  );

  const toggleDescription = (index) => {
    const updatedShowFullDescription = [...showFullDescription];
    updatedShowFullDescription[index] = !updatedShowFullDescription[index];
    setShowFullDescription(updatedShowFullDescription);
  };

  const truncateDescription = (description, index) =>
    description.length > 100 && !showFullDescription[index]
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <div className="about-us">
      <section className="company-overview">
        <h2 className="text-3xl font-semibold">About FitGear Hub</h2>
        <p className="italic">
          Welcome to <strong>FitGear Hub</strong>, your ultimate destination for
          top-quality gym equipment! Founded with a passion for fitness and a
          commitment to excellence, FitGear Hub has grown into a trusted name in
          the fitness industry. Our mission is to empower individuals to lead
          healthier lives by providing them with the best tools to achieve their
          fitness goals. We envision a world where everyone has access to the
          equipment they need to build strength, endurance, and confidence—right
          from the comfort of their homes.
        </p>
      </section>

      <section className="team-introduction">
        <h2 className="text-3xl mt-8 font-semibold">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="shadow-lg py-4 px-4 bg-white rounded-b-3xl">
                <img
                  src={member.image}
                  className="rounded-full max-w-28 mx-auto mb-2"
                  alt={`Team member ${index + 1}`}
                />
                <div className="">
                  <h3 className="text-lg font-extrabold">{member.name}</h3>
                  <p className="text-rose-500 mb-2 font-semibold">
                    {member.position}
                  </p>
                  <p className="italic">
                    {truncateDescription(member.description, index)}
                    {member.description.length > 100 && (
                      <span
                        onClick={() => toggleDescription(index)}
                        className="text-blue-500 cursor-pointer hover:underline"
                      >
                        {showFullDescription[index] ? " See less" : " See more"}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full ">
        <h2 className="text-3xl font-semibold mt-12">What Our Customers Say</h2>
        <div className="">
          <Testimonials />
        </div>
      </div>

      <section className="contact-information">
        <h2 className="text-3xl mt-8 font-semibold">Contact Us</h2>
        {/* <p className="font-semibold">Email: support@fitgearhub.com</p>
        <p>Phone: +123-456-7890</p>
        <p>Address: 123 Fitness St, Workout City, Fitland</p>
        <p>
          We'd love to hear from you! Reach out with any questions or feedback.
        </p> */}
        <ContactUs />
      </section>
    </div>
  );
};

export default AboutUs;
