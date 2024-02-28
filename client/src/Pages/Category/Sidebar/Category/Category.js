import "./Category.css";
import Input from "../../../../Components/Category/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div className="ml">
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="sports"
          title="Sports"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="electronics"
          title="Electronics"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="home appliances"
          title="Home appliances"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="vehicles"
          title="Vehicles"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="art"
          title="Art"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
