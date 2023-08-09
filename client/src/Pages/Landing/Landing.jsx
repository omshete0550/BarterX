import React, { useEffect } from "react";
import "./Landing.css";
import NavbarL from "../../Components/NavbarL/NavbarL";
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/Banner2.png';
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Landing = () => {
  return (
    <>
      <NavbarL />

      <div className="banner_sec">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".banner_left_arrow",
            nextEl: ".banner_right_arrow",
          }}
        >
          <SwiperSlide>
            <img
              className="banner_img"
              src={banner1}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="banner_img"
              src={banner2}
              alt=""
            />
          </SwiperSlide>
        </Swiper>
        {/* <div className="banner_arrows_wrapper">
          <img
            src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-right-arrow-png-image_4421150.jpg"
            className="banner_left_arrow"
          />
          <img
            src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-right-arrow-png-image_4421150.jpg"
            className="banner_right_arrow"
          />
        </div> */}
      </div>
    </>
  );
};

export default Landing;
