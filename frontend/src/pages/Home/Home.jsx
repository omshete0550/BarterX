import React from "react";
import "./Home.css";
import Slider from "../../components/Slider/Slider";
import Category from "../../components/Category/Category";
import Card from "../../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const products = [
  {
    id: 1,
    title: "Nike Air Max",
    description:
      "Experience ultimate comfort and style with these iconic Nike Air Max sneakers.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    date: "20 August 2021",
  },
  {
    id: 2,
    title: "Adidas Ultraboost",
    description:
      "Run faster with the comfortable and supportive Adidas Ultraboost sneakers.",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    date: "10 September 2021",
  },
  {
    id: 3,
    title: "Samsung 4K TV",
    description:
      "Enjoy breathtaking visuals with the Samsung 4K Ultra HD Smart TV.",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/ua43aue60aklxl/gallery/in-uhd-4k-tv-ua43aue60aklxl-samsung-uhd-au-----is-hanging-on-the-wall-showing-picture-with-purcolor-436322441?$650_519_PNG$",
    date: "5 October 2021",
  },
  {
    id: 4,
    title: "iPhone 13",
    description:
      "Experience the latest technology with the iPhone 13, featuring a powerful A15 Bionic chip and advanced camera system.",
    image:
      "https://images.moneycontrol.com/static-mcnews/2021/10/Apple-iPhone-13-4.jpg?impolicy=website&width=1600&height=900",
    date: "14 October 2021",
  },
  {
    id: 5,
    title: "Wooden Dining Table",
    description:
      "A beautiful wooden dining table that adds elegance to your dining room.",
    image:
      "https://rajadigitalplanets.com/cdn/shop/products/514JgB3bmQL_480x480@2x.jpg?v=1603092206",
    date: "28 October 2021",
  },
  {
    id: 6,
    title: "Leather Sofa",
    description:
      "A luxurious leather sofa that combines comfort and style, perfect for any living room.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5iEj7KogUlfyAmxLF3RAnP1O483Fnwtc_hg&s",
    date: "3 November 2021",
  },
  {
    id: 7,
    title: "Samsung Galaxy S21",
    description:
      "Discover the Samsung Galaxy S21, featuring a pro-grade camera and a stunning display.",
    image:
      "https://fdn.gsmarena.com/imgroot/reviews/21/samsung-galaxy-s21-ultra/lifestyle/-1200w5/gsmarena_003.jpg",
    date: "10 November 2021",
  },
];

const Home = () => {
  return (
    <>
      <div className="home-slider">
        <Slider />
      </div>

      <div className="home-category section_padding">
        <h1 className="heading">Category</h1>
        <Category />
      </div>

      <div className="product-swiper section_padding">
        <h1 className="heading">Products</h1>

        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Card product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Home;
