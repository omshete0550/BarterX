import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import "./Review.css";

const Review = () => {
  const [rating, setRating] = useState(0);

  return (
    <>
      <body>
        <section id="testimonials">
          <div className="testimonial-heading">
            <span>Reviews</span>
            <h4>Clients Says</h4>
          </div>
          <div className="testimonial-box-container">
            <div className="testimonial-box">
              <div className="box-top">
                <div className="profile">
                  <div className="profile-img">
                    <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                  </div>
                  <div className="name-user">
                    <strong>Liam mendes</strong>
                    <span>@liammendes</span>
                  </div>
                </div>
                <div className="reviews">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="client-comment">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem, quaerat quis? Provident temporibus architecto
                  asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                  tenetur voluptates incidunt blanditiis sed atque cumque.
                </p>
              </div>
            </div>
            <div className="testimonial-box">
              <div className="box-top">
                <div className="profile">
                  <div className="profile-img">
                    <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                  </div>
                  <div className="name-user">
                    <strong>Noah Wood</strong>
                    <span>@noahwood</span>
                  </div>
                </div>

                <div className="reviews">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>

              <div className="client-comment">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem, quaerat quis? Provident temporibus architecto
                  asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                  tenetur voluptates incidunt blanditiis sed atque cumque.
                </p>
              </div>
            </div>
            <div className="testimonial-box">
              <div className="box-top">
                <div className="profile">
                  <div className="profile-img">
                    <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                  </div>
                  <div className="name-user">
                    <strong>Oliver Queen</strong>
                    <span>@oliverqueen</span>
                  </div>
                </div>

                <div className="reviews">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="client-comment">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem, quaerat quis? Provident temporibus architecto
                  asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                  tenetur voluptates incidunt blanditiis sed atque cumque.
                </p>
              </div>
            </div>

            <div className="testimonial-box">
              <div className="box-top">
                <div className="profile">
                  <div className="profile-img">
                    <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                  </div>
                  <div className="name-user">
                    <strong>Barry Allen</strong>
                    <span>@barryallen</span>
                  </div>
                </div>
                <div className="reviews">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="client-comment">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem, quaerat quis? Provident temporibus architecto
                  asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                  tenetur voluptates incidunt blanditiis sed atque cumque.
                </p>
              </div>
            </div>
          </div>
          <div className="addReviewContainer">
            <div className="addReview">
              <h1>Write Your Review</h1>
              <div className="ratingContainer">
                <Rating />
                <p>
                  Click on a star to change your rating 1 - 5, where 5 = great!
                  and 1 = really bad
                </p>
              </div>
              <div className="reviewContainer">
                <span>Your Review:</span>
                <textarea name="" id="" cols="30" rows="10" placeholder="Enter your review"></textarea>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </section>
      </body>
    </>
  );
};

export default Review;
