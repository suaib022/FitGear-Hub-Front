import React, { useState } from "react";
import { Card } from "antd";
import "./FeaturedCard.css";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const { Meta } = Card;

const FeaturedCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="mx-auto card-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        className={`border border-red-500 ${hovered ? "hovered-card " : ""}`}
        hoverable
        style={{ width: 240, position: "relative", overflow: "hidden" }}
        cover={
          <img
            className="h-64 card-image"
            alt=""
            src="https://images.stockcake.com/public/0/e/5/0e5bcc32-c33c-4137-bd01-c3befacadffb_large/gym-rope-hanging-stockcake.jpg"
          />
        }
      >
        <Meta title={item.name} description="" />
        <Button className="hover-button w-full rounded-none bg-blue-500 text-white h-10 hover:bg-rose-500">
          <NavLink to={`/products/${item?._id}`}> Details</NavLink>
        </Button>
      </Card>
    </div>
  );
};

export default FeaturedCard;
