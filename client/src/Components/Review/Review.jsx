import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import "./Review.css";
import axios from "axios";

const Review = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const user = localStorage.getItem('token');
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState('');

  const fetchReviews = async () => {
    const userData = await axios.get(`http://localhost:8800/api/users/${user}`);
    setUserName(userData.data.name);
  }
  fetchReviews();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/ratings/${product}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchReviews();
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      user,
      userName,
      product,
      rating,
      comment,
    };
    try {
      const response = await axios.post('http://localhost:8800/api/ratings', inputData);
      if (response) {
        setRating(0)
        setComment('')
        alert('Review added successfully')
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleRating = (rate) => {
    setRating(rate)
  }

  return (
    <>
      <body>
        <section id="testimonials">
          {reviews && reviews.map((review) => (
            <div className="testimonial-box">
              <div className="box-top">
                <div className="profile">
                  <div className="name-user">
                    <strong>{review.userName}</strong>
                  </div>
                </div>
                <div className="reviews">
                  {review.rating
                    ? [...Array(review.rating)].map((star) => (
                      <i className="fas fa-star"></i>
                    ))
                    : null}
                </div>
              </div>
              <div className="client-comment">
                <p>
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
          <div className="addReviewContainer">
            <div className="addReview">
              <h1>Rate the product</h1>
              <div className="ratingContainer">
                <Rating
                  onClick={handleRating} />
                <p>
                  Click on a star to change your rating 1 - 5, where 5 = great!
                  and 1 = really bad
                </p>
              </div>
              <div className="reviewContainer">
                <span>Your Rating:</span>
                <textarea name="" id="" cols="30" rows="10" placeholder="Enter your review" onChange={(e) => setComment(e.target.value)}></textarea>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </section>
      </body>
    </>
  );
};

export default Review;
