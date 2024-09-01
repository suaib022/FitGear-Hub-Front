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
      style={{ maxWidth: 400 }}
    >
      <div className="space-y-1 font-semibold ">
        <p>
          <span className=" font-semibold">Name</span> :{"  "}
          <span className="italic ">{name}</span>
        </p>
        <p>
          <span className=" font-semibold">Contact Number</span> :{" "}
          <span className="italic ">{contact}</span>
        </p>
        <p>
          <span className=" font-semibold">Email</span> :{" "}
          <span className="italic ">{email}</span>
        </p>
        <p>
          <span className=" font-semibold">Shipping Address</span> :{" "}
          <span className="italic ">{shippingAddress}</span>
        </p>
        <p>
          <span className=" font-semibold">Will Receive From</span> :{" "}
          <span className="uppercase ">{receivedFrom}</span>
        </p>
      </div>
    </Card>
  );
};

export default UserDetailsCard;
