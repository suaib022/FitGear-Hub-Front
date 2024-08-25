import "./aboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container bg-gray-200 px-8 py-4 shadow-xl">
      <section className="company-overview">
        <h2>Company Overview</h2>
        <p>
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
        <h2>Team Introduction</h2>
        <div className="team-member">
          <h3>John "The Beast" Bennett</h3>
          <p>
            <strong>Founder & CEO</strong>
          </p>
          <p>
            John is a fitness enthusiast with over 15 years of experience in the
            industry. His vision for FitGear Hub was born out of a desire to
            make high-quality fitness equipment accessible to everyone. John
            oversees all operations, ensuring that our values of quality,
            service, and customer satisfaction are always met.
          </p>
        </div>

        <div className="team-member">
          <h3>Emily "Iron Woman" Lee</h3>
          <p>
            <strong>Chief Product Officer</strong>
          </p>
          <p>
            Emily leads our product development team, bringing a wealth of
            knowledge in fitness and product innovation. With her background in
            sports science, Emily ensures that every product we offer meets the
            highest standards of performance and durability.
          </p>
        </div>

        <div className="team-member">
          <h3>Michael "Mighty Mike" Thompson</h3>
          <p>
            <strong>Head of Customer Relations</strong>
          </p>
          <p>
            Michael is the heart of our customer service team. With a decade of
            experience in customer support, he is dedicated to ensuring that
            every FitGear Hub customer has a positive and fulfilling experience.
            Michael is always here to listen to your feedback and answer any
            questions you might have.
          </p>
        </div>

        <div className="team-member">
          <h3>Sarah "Strength Guru" Martinez</h3>
          <p>
            <strong>Marketing Director</strong>
          </p>
          <p>
            Sarah is our marketing mastermind, responsible for spreading the
            word about FitGear Hub. With her creative strategies and deep
            understanding of the fitness community, Sarah connects us with
            customers who are passionate about their health and wellness.
          </p>
        </div>
      </section>

      <section className="customer-testimonials">
        <h2>Customer Testimonials</h2>
        <blockquote>
          <p>
            "FitGear Hub has completely transformed my home gym! The quality of
            their equipment is unmatched, and their customer service is
            top-notch." — <strong>Jessica T.</strong>
          </p>
        </blockquote>
        <blockquote>
          <p>
            "I was able to find everything I needed to kickstart my fitness
            journey. The team at FitGear Hub really knows their stuff and helped
            me choose the perfect gear." — <strong>Ryan W.</strong>
          </p>
        </blockquote>
        <blockquote>
          <p>
            "The durability and performance of the equipment I purchased are
            fantastic. I recommend FitGear Hub to anyone serious about their
            fitness." — <strong>Amanda L.</strong>
          </p>
        </blockquote>
      </section>

      <section className="contact-information">
        <h2>Contact Information</h2>
        <p>
          We would love to hear from you! Whether you have questions, feedback,
          or need assistance in choosing the right equipment, our team is here
          to help.
        </p>
        <p>
          <strong>Email:</strong> support@fitgearhub.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (800) 123-4567
        </p>
        <p>
          <strong>Address:</strong> 123 Fitness Ave, Workout City, WF 54321, USA
        </p>

        <p>
          Connect with us on social media to stay updated on the latest
          products, promotions, and fitness tips:
        </p>
        <ul>
          <li>
            <strong>Facebook:</strong>{" "}
            <a
              href="https://facebook.com/fitgearhub"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook.com/fitgearhub
            </a>
          </li>
          <li>
            <strong>Instagram:</strong>{" "}
            <a
              href="https://instagram.com/fitgearhub"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram.com/fitgearhub
            </a>
          </li>
          <li>
            <strong>Twitter:</strong>{" "}
            <a
              href="https://twitter.com/fitgearhub"
              target="_blank"
              rel="noopener noreferrer"
            >
              twitter.com/fitgearhub
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
