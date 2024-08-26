import mail from "../../assets/ContuctUs/gmail.png";
import location from "../../assets/ContuctUs/location.png";
import instagram from "../../assets/ContuctUs/social.png";
import telephone from "../../assets/ContuctUs/telephone.png";

const ContactUs = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 ">
      <div className="flex justify-center">
        <img className="w-12" src={mail} alt="" />
      </div>
      <div className="flex justify-center">
        <img className="w-12" src={instagram} alt="" />
      </div>
      <div className="flex justify-center">
        <img className="w-12" src={telephone} alt="" />
      </div>
      <div className="flex justify-center">
        <img className="w-12" src={location} alt="" />
      </div>
    </div>
  );
};

export default ContactUs;
