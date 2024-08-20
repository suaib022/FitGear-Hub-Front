import { Card } from "antd";
import { FaUserEdit } from "react-icons/fa";

const UserDetailsCard = ({ userDetails, setEmptyUser }) => {
  const { name, contact, email, receivedFrom, shippingAddress } = userDetails;

  return (
    <Card
      className=""
      title={
        <div className=" flex items-center justify-between">
          <h2>User Info</h2>
          <FaUserEdit
            onClick={() => setEmptyUser(true)}
            className="mr-4 text-blue-500"
          />{" "}
        </div>
      }
      bordered={false}
      style={{ width: 300 }}
    >
      <div className="space-y-1 font-semibold">
        <p>Name : {name}</p>
        <p>Contact Number : {contact}</p>
        <p>Email : {email}</p>
        <p>Shipping Address : {shippingAddress}</p>
        <p>
          Will Receive From : <span className="uppercase">{receivedFrom}</span>
        </p>
      </div>
    </Card>
  );
};

export default UserDetailsCard;
