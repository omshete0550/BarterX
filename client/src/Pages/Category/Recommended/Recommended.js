import Button from "../../../Components/Category/Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="vehicles" title="Vehicles" />
          <Button onClickHandler={handleClick} value="electronics" title="Electronics" />
          {/* <Button onClickHandler={handleClick} value="Puma" title="Puma" />
          <Button onClickHandler={handleClick} value="Vans" title="Vans" /> */}
        </div>
      </div>
    </>
  );
};

export default Recommended;
