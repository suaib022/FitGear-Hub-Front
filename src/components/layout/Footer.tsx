const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between ">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl text-white font-bold text-start mb-1">
              FitGear Hub
            </h2>
            <p className="text-white">
              Your ultimate destination for premium fitness equipment.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <p className="text-white">Email: support@fitgearhub.com</p>
            <p className="text-white">Phone: +1 (800) 123-4567</p>
            <p className="text-white">
              Address: 123 Fitness St, Workout City, Fitland
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-400">
                Facebook
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Twitter
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10  text-center">
          <p className="text-white">© 2024 FitGear Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
