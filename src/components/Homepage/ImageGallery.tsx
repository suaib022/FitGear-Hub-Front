import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import img1 from "../../assets/Individuals/1.jpg";
import img2 from "../../assets/Individuals/2.jpg";
import img3 from "../../assets/Individuals/3.jpg";
import img4 from "../../assets/Individuals/4.jpg";
import img5 from "../../assets/Individuals/5.jpg";
import img6 from "../../assets/Individuals/6.jpg";
import img7 from "../../assets/Individuals/7.jpg";
import img8 from "../../assets/Individuals/8.jpg";
import img9 from "../../assets/Individuals/9.jpg";
import img10 from "../../assets/Individuals/10.jpg";
import img11 from "../../assets/Individuals/11.jpg";
import img12 from "../../assets/Individuals/12.jpg";
import img13 from "../../assets/Individuals/13.jpg";
import img14 from "../../assets/Individuals/14.jpg";
import img15 from "../../assets/Individuals/15.jpg";
import img16 from "../../assets/Individuals/16.jpg";
import img17 from "../../assets/Individuals/17.jpg";
import img18 from "../../assets/Individuals/18.jpg";
import img19 from "../../assets/Individuals/19.jpg";
import img20 from "../../assets/Individuals/20.jpg";
import img21 from "../../assets/Individuals/21.jpg";
import img22 from "../../assets/Individuals/22.jpg";
import img23 from "../../assets/Individuals/23.jpg";
import img24 from "../../assets/Individuals/24.jpg";
import img25 from "../../assets/Individuals/25.jpg";
import img26 from "../../assets/Individuals/26.jpg";
import img27 from "../../assets/Individuals/27.jpg";
import img28 from "../../assets/Individuals/28.jpg";
import img29 from "../../assets/Individuals/29.jpg";
import img30 from "../../assets/Individuals/30.jpg";
import img31 from "../../assets/Individuals/31.jpg";
import img32 from "../../assets/Individuals/32.jpg";
import img33 from "../../assets/Individuals/33.jpg";
import img34 from "../../assets/Individuals/34.jpg";
import img35 from "../../assets/Individuals/35.jpg";
import img36 from "../../assets/Individuals/36.jpg";
import img37 from "../../assets/Individuals/37.jpg";
import img38 from "../../assets/Individuals/38.jpg";
import img39 from "../../assets/Individuals/39.jpg";
import img40 from "../../assets/Individuals/40.jpg";
import img41 from "../../assets/Individuals/41.jpg";
import img42 from "../../assets/Individuals/42.jpg";
import img43 from "../../assets/Individuals/43.jpg";
import img44 from "../../assets/Individuals/44.jpg";
import img45 from "../../assets/Individuals/45.jpg";
import img46 from "../../assets/Individuals/46.jpg";
import img47 from "../../assets/Individuals/47.jpg";
import img48 from "../../assets/Individuals/48.jpg";
import img49 from "../../assets/Individuals/49.jpg";
import img50 from "../../assets/Individuals/50.jpg";

const ImageGallery = () => {
  return (
    <div className="">
      <h2 className="text-4xl text-center my-4 font-bold mb-8 text-gray-800">
        Our Clients
      </h2>
      <Box>
        <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={2}>
          {itemData.map((item, index) => (
            <div key={index}>
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
              />
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
  },
  {
    img: img2,
    title: "img2",
  },
  {
    img: img3,
    title: "img3",
  },
  {
    img: img4,
    title: "img4",
  },
  {
    img: img5,
    title: "img5",
  },
  {
    img: img6,
    title: "img6",
  },
  {
    img: img7,
    title: "img7",
  },
  {
    img: img8,
    title: "img8",
  },
  {
    img: img9,
    title: "img9",
  },
  {
    img: img10,
    title: "img10",
  },
  {
    img: img11,
    title: "img11",
  },
  {
    img: img12,
    title: "img12",
  },
  {
    img: img13,
    title: "img13",
  },
  {
    img: img14,
    title: "img14",
  },
  {
    img: img15,
    title: "img15",
  },
  {
    img: img16,
    title: "img16",
  },
  {
    img: img17,
    title: "img17",
  },
  {
    img: img18,
    title: "img18",
  },
  {
    img: img19,
    title: "img19",
  },
  {
    img: img20,
    title: "img20",
  },
  {
    img: img21,
    title: "img21",
  },
  {
    img: img22,
    title: "img22",
  },
  {
    img: img23,
    title: "img23",
  },
  {
    img: img24,
    title: "img24",
  },
  {
    img: img25,
    title: "img25",
  },
  {
    img: img26,
    title: "img26",
  },
  {
    img: img27,
    title: "img27",
  },
  {
    img: img28,
    title: "img28",
  },
  {
    img: img29,
    title: "img29",
  },
  {
    img: img30,
    title: "img30",
  },
  {
    img: img31,
    title: "img31",
  },
  {
    img: img32,
    title: "img32",
  },
  {
    img: img33,
    title: "img33",
  },
  {
    img: img34,
    title: "img34",
  },
  {
    img: img35,
    title: "img35",
  },
  {
    img: img36,
    title: "img36",
  },
  {
    img: img37,
    title: "img37",
  },
  {
    img: img38,
    title: "img38",
  },
  {
    img: img39,
    title: "img39",
  },
  {
    img: img40,
    title: "img40",
  },
  {
    img: img41,
    title: "img41",
  },
  {
    img: img42,
    title: "img42",
  },
  {
    img: img43,
    title: "img43",
  },
  {
    img: img44,
    title: "img44",
  },
  {
    img: img45,
    title: "img45",
  },
  {
    img: img46,
    title: "img46",
  },
  {
    img: img47,
    title: "img47",
  },
  {
    img: img48,
    title: "img48",
  },
  {
    img: img49,
    title: "img49",
  },
  {
    img: img50,
    title: "img50",
  },
];
