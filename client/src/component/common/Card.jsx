import "../../styles/common/card.css";

function Card({ children, className = "", padding = "medium", hover = false }) {
  return (
    <div
      className={`card card-padding-${padding} ${
        hover ? "card-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
