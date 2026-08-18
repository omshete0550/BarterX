import { useState } from "react";
import "./AddProduct.css";

function AddProduct() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    location: "",
    desiredProduct: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product:", formData);
    console.log("Images:", images);
  };

  return (
    <div className="add-product-page">
      {/* Header */}
      <section className="add-product-header">
        <div className="add-product-container">
          <div>
            <span className="add-product-eyebrow">LIST YOUR ITEM</span>

            <h1>
              Add a product to
              <span> BarterX.</span>
            </h1>

            <p>
              List something you own and find someone who has what you're
              looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="add-product-main">
        <div className="add-product-container">
          <form className="add-product-layout" onSubmit={handleSubmit}>
            {/* =====================================
                            LEFT SIDE FORM
                        ===================================== */}

            <div className="add-product-form">
              {/* Images */}
              <div className="form-section">
                <div className="form-section-heading">
                  <div>
                    <h2>Product Images</h2>
                    <p>Add clear photos of the product you're offering.</p>
                  </div>

                  <span>{images.length}/5</span>
                </div>

                <div className="image-upload-grid">
                  {/* Upload */}
                  {images.length < 5 && (
                    <label
                      className="image-upload-box"
                      htmlFor="product-images"
                    >
                      <div className="upload-icon">+</div>

                      <strong>Add photos</strong>

                      <span>PNG, JPG up to 5MB</span>

                      <input
                        id="product-images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  {/* Uploaded images */}
                  {images.map((image, index) => (
                    <div className="uploaded-image" key={index}>
                      <img src={image} alt={`Product ${index + 1}`} />

                      <button type="button" onClick={() => removeImage(index)}>
                        ×
                      </button>

                      {index === 0 && <span>Main image</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="form-section">
                <div className="form-section-heading">
                  <div>
                    <h2>Product Information</h2>

                    <p>Tell people about the item you're offering.</p>
                  </div>
                </div>

                {/* Title */}
                <div className="form-group">
                  <label htmlFor="title">Product Title</label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g. MacBook Air M1"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                {/* Category + Condition */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>

                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select category</option>

                      <option value="Electronics">Electronics</option>

                      <option value="Furniture">Furniture</option>

                      <option value="Books">Books</option>

                      <option value="Sports">Sports</option>

                      <option value="Music">Music</option>

                      <option value="Fashion">Fashion</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="condition">Condition</label>

                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                    >
                      <option value="">Select condition</option>

                      <option value="New">New</option>

                      <option value="Like New">Like New</option>

                      <option value="Good">Good</option>

                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="form-group">
                  <label htmlFor="location">Location</label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g. Pune, Maharashtra"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                {/* Desired product */}
                <div className="form-group">
                  <label htmlFor="desiredProduct">
                    What are you looking for?
                  </label>

                  <input
                    id="desiredProduct"
                    name="desiredProduct"
                    type="text"
                    placeholder="e.g. Gaming Keyboard"
                    value={formData.desiredProduct}
                    onChange={handleChange}
                  />

                  <span className="input-help">
                    Tell others what you'd like in exchange for this product.
                  </span>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description">Description</label>

                  <textarea
                    id="description"
                    name="description"
                    rows="6"
                    placeholder="Describe your product, its condition, accessories included, and anything else buyers should know..."
                    value={formData.description}
                    onChange={handleChange}
                  />

                  <div className="character-count">
                    {formData.description.length}/1000
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="add-product-actions">
                <button type="button" className="cancel-product-btn">
                  Cancel
                </button>

                <button type="submit" className="publish-product-btn">
                  Publish Product
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* =====================================
                            RIGHT SIDE PREVIEW
                        ===================================== */}

            <aside className="product-preview">
              <div className="preview-heading">
                <div>
                  <span>PREVIEW</span>
                  <h2>Your product listing</h2>
                </div>

                <div className="preview-dot"></div>
              </div>

              <div className="preview-card">
                {/* Image */}
                <div className="preview-image">
                  {images.length > 0 ? (
                    <img src={images[0]} alt="Product preview" />
                  ) : (
                    <div className="preview-placeholder">
                      <div>+</div>

                      <span>Product image</span>
                    </div>
                  )}

                  <button type="button" className="preview-heart">
                    ♡
                  </button>
                </div>

                {/* Content */}
                <div className="preview-content">
                  <span className="preview-category">
                    {formData.category || "CATEGORY"}
                  </span>

                  <h3>{formData.title || "Your product title"}</h3>

                  <div className="preview-meta">
                    <span>{formData.condition || "Condition"}</span>

                    <span>•</span>

                    <span>{formData.location || "Location"}</span>
                  </div>

                  <div className="preview-divider"></div>

                  <div className="preview-wanted">
                    <div>
                      <span>LOOKING FOR</span>

                      <strong>
                        {formData.desiredProduct ||
                          "What would you like in exchange?"}
                      </strong>
                    </div>

                    <div className="preview-swap">⇄</div>
                  </div>

                  <div className="preview-owner">
                    <div className="preview-avatar">O</div>

                    <div>
                      <strong>You</strong>

                      <span>Your listing</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="listing-tips">
                <div className="tips-icon">✦</div>

                <div>
                  <strong>Make your listing stand out</strong>

                  <p>
                    Clear photos and detailed descriptions help you get better
                    swap offers.
                  </p>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddProduct;
