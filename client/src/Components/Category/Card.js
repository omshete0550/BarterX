import { BsCart, BsHandThumbsUp, BsHeart } from "react-icons/bs";

const Card = ({ img, title, owner, desiredProduct, star, prevPrice, newPrice }) => {
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <p className="card-desc"><strong>Owner</strong>: {owner}</p>
          <p className="card-desc"><strong>Require</strong>: {desiredProduct}</p>


          <section className="card-price">
            {/* <div className="price">
              Rs. {newPrice}
            </div> */}
            <div className="bag">
              {/* <i><BsCart className="bag-icon" /></i> */}
              <i><BsHeart className="bag-icon" /></i>
              <i><BsHandThumbsUp className="bag-icon" /></i>       
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
