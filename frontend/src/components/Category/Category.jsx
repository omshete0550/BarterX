import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

const categories = [
  {
    name: "Electronics",
    image:
      "https://img.freepik.com/premium-photo/hightech-devices-yellow-surface-vibrant-product-photography_976564-6689.jpg",
    description:
      "Explore the latest gadgets and electronic devices that keep you connected and entertained.",
  },
  {
    name: "Home Appliances",
    image:
      "https://media.istockphoto.com/id/1127551092/photo/kitchen-appliances-on-a-neutral-background.jpg?s=612x612&w=0&k=20&c=lsWJM7eIZ_lo8i8icTGNK3JvtFcv0fDroEVo3-2YD0Y=",
    description:
      "Find a variety of home appliances to make your life easier and more comfortable.",
  },
  {
    name: "Furniture",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/4/298313334/MH/HU/ZH/7813591/modular-bedroom-furniture.jpg",
    description:
      "Enhance your living space with our stylish and comfortable furniture pieces.",
  },
  {
    name: "Vehicles",
    image:
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
    description:
      "Browse our collection of vehicles, from cars to motorcycles, to find your perfect ride.",
  },
  {
    name: "Sports",
    image:
      "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
    description:
      "Gear up with the best sports equipment and accessories for all your athletic needs.",
  },
  {
    name: "Education",
    image:
      "https://www.21kschool.com/in/wp-content/uploads/sites/4/2021/01/rptgtpxd-1396254731.jpg",
    description:
      "Discover educational resources and tools to enhance your learning experience.",
  },
  {
    name: "Miscellaneous",
    image:
      "https://t3.ftcdn.net/jpg/01/30/31/52/360_F_130315200_YJqUUotQXUPpJHXo5XAWFX15cWZ7n8mB.jpg",
    description:
      "Explore a variety of miscellaneous items that cater to different interests and hobbies.",
  },
  {
    name: "Arts",
    image:
      "https://in2english.net/wp-content/uploads/2018/05/Arts2.jpg",
    description:
      "Find a wide range of art supplies and creative tools to unleash your inner artist.",
  },

];

const Category = () => {
  return (
    <div className="category-card-container">
      {categories.map((category, index) => (
        <article className="category-card" key={index}>
          <img
            className="card__background"
            src={category.image}
            alt={`Photo representing ${category.name}`}
          />
          <div className="card__content | flow">
            <div className="card__content--container | flow">
              <h2 className="card__title">{category.name}</h2>
              <p className="card__description">{category.description}</p>
            </div>
            <button className="card__button">Read more</button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Category;
