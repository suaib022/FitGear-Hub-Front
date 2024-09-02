import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./testimonials.css";
import { customerReviews } from "@/pages/about/aboutUsConstants";

const Testimonials = () => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {customerReviews.map((review, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col sm:flex-row  items-center text-center p-4 bg-white shadow-lg rounded-lg"
          >
            <div className="sm:w-1/3 flex flex-col justify-center  items-center mb-4 sm:mb-0 ">
              <div className=" w-20 ">
                <img src={review.image} className="rounded-full mb-1 " />
                <h3 className="text-sm font-bold mb-2">{review.name}</h3>
              </div>
              <div className="flex text-center">
                {Array(review.rating)
                  .fill(undefined)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l2.39 4.83 5.31.77-3.85 3.75.91 5.31-4.76-2.5-4.76 2.5.91-5.31-3.85-3.75 5.31-.77L12 2z" />
                    </svg>
                  ))}
                {Array(5 - review.rating)
                  .fill(undefined)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l2.39 4.83 5.31.77-3.85 3.75.91 5.31-4.76-2.5-4.76 2.5.91-5.31-3.85-3.75 5.31-.77L12 2z" />
                    </svg>
                  ))}
              </div>
            </div>

            <div className="sm:w-2/3 ">
              <p className="italic mb-4 text-slate-950">{review.review}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Testimonials;
