import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import "./ImageGallery.css";
import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import img1 from "../../../assets/Individuals/1.jpg";
import img2 from "../../../assets/Individuals/2.jpg";
import img3 from "../../../assets/Individuals/3.jpg";
import img4 from "../../../assets/Individuals/4.jpg";
import img5 from "../../../assets/Individuals/5.jpg";
import img6 from "../../../assets/Individuals/6.jpg";
import img7 from "../../../assets/Individuals/7.jpg";
import img8 from "../../../assets/Individuals/8.jpg";
import img9 from "../../../assets/Individuals/9.jpg";
import img10 from "../../../assets/Individuals/10.jpg";
import img11 from "../../../assets/Individuals/11.jpg";
import img12 from "../../../assets/Individuals/12.jpg";
import img13 from "../../../assets/Individuals/13.jpg";
import img14 from "../../../assets/Individuals/14.jpg";
import img15 from "../../../assets/Individuals/15.jpg";
import img16 from "../../../assets/Individuals/16.jpg";
import img17 from "../../../assets/Individuals/17.jpg";
import img18 from "../../../assets/Individuals/18.jpg";
import img19 from "../../../assets/Individuals/19.jpg";
import img20 from "../../../assets/Individuals/20.jpg";
import img21 from "../../../assets/Individuals/21.jpg";
import img22 from "../../../assets/Individuals/22.jpg";
import img23 from "../../../assets/Individuals/23.jpg";
import img24 from "../../../assets/Individuals/24.jpg";
import img25 from "../../../assets/Individuals/25.jpg";
import img26 from "../../../assets/Individuals/26.jpg";
import img27 from "../../../assets/Individuals/27.jpg";
import img28 from "../../../assets/Individuals/28.jpg";
import img29 from "../../../assets/Individuals/29.jpg";
import img30 from "../../../assets/Individuals/30.jpg";
import img31 from "../../../assets/Individuals/31.jpg";
import img32 from "../../../assets/Individuals/32.jpg";
import img33 from "../../../assets/Individuals/33.jpg";
import img34 from "../../../assets/Individuals/34.jpg";
import img35 from "../../../assets/Individuals/35.jpg";
import img36 from "../../../assets/Individuals/36.jpg";
import img37 from "../../../assets/Individuals/37.jpg";
import img38 from "../../../assets/Individuals/38.jpg";
import img39 from "../../../assets/Individuals/39.jpg";
import img40 from "../../../assets/Individuals/40.jpg";
import img41 from "../../../assets/Individuals/41.jpg";
import img42 from "../../../assets/Individuals/42.jpg";
import img43 from "../../../assets/Individuals/43.jpg";
import img44 from "../../../assets/Individuals/44.jpg";
import img45 from "../../../assets/Individuals/45.jpg";
import img46 from "../../../assets/Individuals/46.jpg";
import img47 from "../../../assets/Individuals/47.jpg";
import img48 from "../../../assets/Individuals/48.jpg";
import img49 from "../../../assets/Individuals/49.jpg";
import img50 from "../../../assets/Individuals/50.jpg";

const ImageGallery = () => {
  return (
    <div className="">
      <h2 className="text-4xl text-center my-4 font-bold mb-8 text-gray-800">
        Meet Our Healthy Individuals
      </h2>
      <Box>
        <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={2}>
          {itemData.map((item, index) => (
            <div key={index}>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <img
                    srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=162&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      display: "block",
                      width: "100%",
                    }}
                    className="hovered-card"
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={item.img} />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-rose-500">
                        {item.name}
                      </h4>
                      <p className="text-sm italic">{item.description}</p>
                      <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          Joined{" "}
                          <span className=" text-black font-semibold">
                            {item.customerJoined}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </Masonry>
      </Box>
    </div>
  );
};

export default ImageGallery;

const itemData = [
  {
    img: img1,
    title: "img1",
    gender: "male",
    name: "John Doe",
    description:
      "John is a dedicated weight lifter who has been a regular customer for over a year. He is particularly interested in advanced strength training equipment.",
    customerJoined: "January 2023",
  },
  {
    img: img2,
    title: "img2",
    gender: "female",
    name: "Olivia Johnson",
    description:
      "Olivia is a yoga enthusiast and fitness coach who frequently purchases yoga mats and accessories. She also conducts fitness workshops.",
    customerJoined: "November 2022",
  },
  {
    img: img3,
    title: "img3",
    gender: "male",
    name: "Michael Brown",
    description:
      "Michael is a professional bodybuilder who relies on high-quality gym equipment for his training. He often buys heavy-duty weights and machines.",
    customerJoined: "March 2023",
  },
  {
    img: img4,
    title: "img4",
    gender: "female",
    name: "Emily Davis",
    description:
      "Emily is a fitness enthusiast who enjoys a mix of cardio and strength training. She often purchases treadmills and elliptical machines.",
    customerJoined: "February 2023",
  },
  {
    img: img5,
    title: "img5",
    gender: "male",
    name: "David Wilson",
    description:
      "David is a marathon runner who focuses on endurance training. He frequently buys running shoes and other related accessories.",
    customerJoined: "April 2023",
  },
  {
    img: img6,
    title: "img6",
    gender: "male",
    name: "Chris Johnson",
    description:
      "Chris is a personal trainer who buys a variety of gym equipment for his clients. He is particularly interested in versatile and durable equipment.",
    customerJoined: "May 2023",
  },
  {
    img: img7,
    title: "img7",
    gender: "female",
    name: "Sarah Lee",
    description:
      "Sarah is a pilates instructor who often purchases pilates reformers and other related equipment. She also runs a small fitness studio.",
    customerJoined: "June 2023",
  },
  {
    img: img8,
    title: "img8",
    gender: "male",
    name: "James Martinez",
    description:
      "James is a crossfit enthusiast who buys a range of equipment for his high-intensity workouts. He often looks for the latest in crossfit gear.",
    customerJoined: "July 2023",
  },
  {
    img: img9,
    title: "img9",
    gender: "male",
    name: "Robert Garcia",
    description:
      "Robert is a sports coach who purchases equipment for his team. He focuses on buying high-quality and durable sports gear.",
    customerJoined: "August 2023",
  },
  {
    img: img10,
    title: "img10",
    gender: "female",
    name: "Linda Rodriguez",
    description:
      "Linda is a fitness blogger who reviews various gym equipment. She often buys the latest products to test and write about.",
    customerJoined: "September 2023",
  },
  {
    img: img11,
    title: "img11",
    gender: "male",
    name: "Liam Wilson",
    description:
      "Wilson is a gym owner who frequently updates his gym with new equipment. He looks for durable and high-performance machines.",
    customerJoined: "October 2023",
  },
  {
    img: img12,
    title: "img12",
    gender: "female",
    name: "Maria Lopez",
    description:
      "Maris is a dance instructor who buys equipment for her dance studio. She focuses on purchasing items that enhance flexibility and strength.",
    customerJoined: "November 2023",
  },
  {
    img: img13,
    title: "img13",
    gender: "male",
    name: "Thomas Clark",
    description:
      "Thomas is a fitness model who needs top-notch equipment for his training. He often buys the latest in fitness technology.",
    customerJoined: "December 2023",
  },
  {
    img: img14,
    title: "img14",
    gender: "female",
    name: "Ava Thomas",
    description:
      "Ava is a health and wellness coach who buys a variety of equipment for her clients. She focuses on holistic fitness solutions.",
    customerJoined: "January 2024",
  },
  {
    img: img15,
    title: "img15",
    gender: "male",
    name: "Paul Walker",
    description:
      "Paul is a competitive swimmer who buys equipment for his dryland training. He often looks for resistance training gear.",
    customerJoined: "February 2024",
  },
  {
    img: img16,
    title: "img16",
    gender: "male",
    name: "Mark Hall",
    description:
      "Mark is a physical therapist who purchases rehabilitation equipment for his clinic. He focuses on items that aid in recovery and strength building.",
    customerJoined: "March 2024",
  },
  {
    img: img17,
    title: "img17",
    gender: "male",
    name: "William Brown",
    description:
      "William is a high school PE teacher who buys equipment for his students. He looks for durable and versatile gym gear.",
    customerJoined: "April 2024",
  },
  {
    img: img18,
    title: "img18",
    gender: "male",
    name: "Kevin Young",
    description:
      "Kevin is a triathlete who needs a variety of equipment for his training. He often buys high-end bikes and running gear.",
    customerJoined: "May 2024",
  },
  {
    img: img19,
    title: "img19",
    gender: "female",
    name: "Laura King",
    description:
      "Laura is a nutritionist who also focuses on fitness. She buys equipment that complements her holistic approach to health.",
    customerJoined: "June 2024",
  },
  {
    img: img20,
    title: "img20",
    gender: "male",
    name: "Brian Wright",
    description:
      "Brian is a fitness enthusiast who enjoys a mix of strength and cardio training. He frequently buys the latest fitness gadgets.",
    customerJoined: "July 2024",
  },
  {
    img: img21,
    title: "img21",
    gender: "male",
    name: "Noah Anderson",
    description:
      "Noah is a senior citizen who focuses on maintaining his fitness. He often buys low-impact equipment suitable for his age.",
    customerJoined: "August 2024",
  },
  {
    img: img22,
    title: "img22",
    gender: "male",
    name: "George Adams",
    description:
      "George is a fitness trainer who buys equipment for his clients. He looks for versatile and durable gym gear.",
    customerJoined: "September 2024",
  },
  {
    img: img23,
    title: "img23",
    gender: "female",
    name: "Susan Baker",
    description:
      "Susan is a fitness influencer who reviews various gym equipment. She often buys the latest products to test and promote.",
    customerJoined: "October 2024",
  },
  {
    img: img24,
    title: "img24",
    gender: "male",
    name: "Charles Mitchell",
    description:
      "Charles is a fitness enthusiast who enjoys a mix of strength and cardio training. He frequently buys the latest fitness gadgets.",
    customerJoined: "November 2024",
  },
  {
    img: img25,
    title: "img25",
    gender: "male",
    name: "Anthony Perez",
    description:
      "Anthony is a professional athlete who relies on high-quality gym equipment for his training. He often buys heavy-duty weights and machines.",
    customerJoined: "December 2024",
  },
  {
    img: img26,
    title: "img26",
    gender: "female",
    name: "Patricia Roberts",
    description:
      "Patricia is a fitness coach who buys a variety of gym equipment for her clients. She is particularly interested in versatile and durable equipment.",
    customerJoined: "January 2025",
  },
  {
    img: img27,
    title: "img27",
    gender: "male",
    name: "Christopher Turner",
    description:
      "Christopher is a gym owner who frequently updates his gym with new equipment. He looks for durable and high-performance machines.",
    customerJoined: "February 2025",
  },
  {
    img: img28,
    title: "img28",
    gender: "male",
    name: "Matthew Phillips",
    description:
      "Matthew is a fitness enthusiast who enjoys a mix of cardio and strength training. He often purchases treadmills and elliptical machines.",
    customerJoined: "March 2025",
  },
  {
    img: img29,
    title: "img29",
    gender: "female",
    name: "Barbara Campbell",
    description:
      "Barbara is a pilates instructor who often purchases pilates reformers and other related equipment. She also runs a small fitness studio.",
    customerJoined: "April 2025",
  },
  {
    img: img30,
    title: "img30",
    gender: "male",
    name: "Joshua Parker",
    description:
      "Joshua is a crossfit enthusiast who buys a range of equipment for his high-intensity workouts",
    customerJoined: "March 2019",
  },
  {
    img: img31,
    title: "img31",
    gender: "male",
    name: "Joshua Parker",
    description:
      "Joshua is a crossfit enthusiast who buys a range of equipment for his high-intensity workouts. He often looks for the latest in crossfit gear.",
    customerJoined: "March 2025",
  },
  {
    img: img32,
    title: "img32",
    gender: "female",
    name: "Barbara Campbell",
    description:
      "Barbara is a pilates instructor who often purchases pilates reformers and other related equipment. She also runs a small fitness studio.",
    customerJoined: "April 2025",
  },
  {
    img: img33,
    title: "img33",
    gender: "male",
    name: "Matthew Phillips",
    description:
      "Matthew is a fitness enthusiast who enjoys a mix of cardio and strength training. He often purchases treadmills and elliptical machines.",
    customerJoined: "March 2025",
  },
  {
    img: img34,
    title: "img34",
    gender: "male",
    name: "Christopher Turner",
    description:
      "Christopher is a gym owner who frequently updates his gym with new equipment. He looks for durable and high-performance machines.",
    customerJoined: "February 2025",
  },
  {
    img: img35,
    title: "img35",
    gender: "female",
    name: "Patricia Roberts",
    description:
      "Patricia is a fitness coach who buys a variety of gym equipment for her clients. She is particularly interested in versatile and durable equipment.",
    customerJoined: "January 2025",
  },
  {
    img: img36,
    title: "img36",
    gender: "male",
    name: "Alexander Peterson",
    description:
      "Alex is a high school PE teacher who buys equipment for his students. He looks for durable and versatile gym gear.",
    customerJoined: "April 2024",
  },
  {
    img: img37,
    title: "img37",
    gender: "male",
    name: "Kevin Young",
    description:
      "Kevin is a triathlete who needs a variety of equipment for his training. He often buys high-end bikes and running gear.",
    customerJoined: "May 2024",
  },
  {
    img: img38,
    title: "img38",
    gender: "male",
    name: "Robert Garcia",
    description:
      "Robert is a sports coach who purchases equipment for his team. He focuses on buying high-quality and durable sports gear.",
    customerJoined: "August 2023",
  },
  {
    img: img39,
    title: "img39",
    gender: "male",
    name: "James Smith",
    description:
      "Smith is a crossfit enthusiast who buys a range of equipment for his high-intensity workouts. He often looks for the latest in crossfit gear.",
    customerJoined: "July 2023",
  },
  {
    img: img40,
    title: "img40",
    gender: "male",
    name: "David Wilson",
    description:
      "David is a marathon runner who focuses on endurance training. He frequently buys running shoes and other related accessories.",
    customerJoined: "April 2023",
  },
  {
    img: img41,
    title: "img41",
    gender: "female",
    name: "Sarah Lee",
    description:
      "Sarah is a pilates instructor who often purchases pilates reformers and other related equipment. She also runs a small fitness studio.",
    customerJoined: "June 2023",
  },
  {
    img: img42,
    title: "img42",
    gender: "male",
    name: "Chris Johnson",
    description:
      "Chris is a personal trainer who buys a variety of gym equipment for his clients. He is particularly interested in versatile and durable equipment.",
    customerJoined: "May 2023",
  },
  {
    img: img43,
    title: "img43",
    gender: "male",
    name: "Daniel Hernandez",
    description:
      "Daniel is a gym owner who frequently updates his gym with new equipment. He looks for durable and high-performance machines.",
    customerJoined: "October 2023",
  },
  {
    img: img44,
    title: "img44",
    gender: "female",
    name: "Sophia Davis",
    description:
      "Sophia is a fitness blogger who reviews various gym equipment. She often buys the latest products to test and write about.",
    customerJoined: "September 2023",
  },
  {
    img: img45,
    title: "img45",
    gender: "male",
    name: "Michael Brown",
    description:
      "Michael is a professional bodybuilder who relies on high-quality gym equipment for his training. He often buys heavy-duty weights and machines.",
    customerJoined: "March 2023",
  },
  {
    img: img46,
    title: "img46",
    gender: "male",
    name: "John Doe",
    description:
      "John is a dedicated weight lifter who has been a regular customer for over a year. He is particularly interested in advanced strength training equipment.",
    customerJoined: "January 2023",
  },
  {
    img: img47,
    title: "img47",
    gender: "female",
    name: "Emma Martinez",
    description:
      "Emma is a yoga enthusiast and fitness coach who frequently purchases yoga mats and accessories. She also conducts fitness workshops.",
    customerJoined: "November 2022",
  },
  {
    img: img48,
    title: "img48",
    gender: "male",
    name: "Paul Walker",
    description:
      "Paul is a competitive swimmer who buys equipment for his dryland training. He often looks for resistance training gear.",
    customerJoined: "February 2024",
  },
  {
    img: img49,
    title: "img49",
    gender: "male",
    name: "Mark Hall",
    description:
      "Mark is a physical therapist who purchases rehabilitation equipment for his clinic. He focuses on items that aid in recovery and strength building.",
    customerJoined: "March 2024",
  },
  {
    img: img50,
    title: "img50",
    gender: "female",
    name: "Emily Davis",
    description:
      "Emily is a fitness enthusiast who enjoys a mix of cardio and strength training. She often purchases treadmills and elliptical machines.",
    customerJoined: "February 2023",
  },
];
