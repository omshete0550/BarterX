import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, MapPin, Save, Trash2, X } from "lucide-react";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import products from "../../data/product";

import "./EditProduct.css";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    location: "",
    desiredProduct: "",
    description: "",
  });

  /*
   * Load existing product
   *
   * For now we're using mock data.
   * Later this will come from:
   *
   * GET /api/product/:productId
   */
  useEffect(() => {
    const product = products.find((item) => String(item.id) === String(id));

    if (!product) {
      setError("Product not found.");
      setLoading(false);
      return;
    }

    setFormData({
      title: product.title || "",
      category: product.category || "",
      condition: product.condition || "",
      location: product.location || "",
      desiredProduct: product.desiredProduct || "",
      description: product.description || "",
    });

    setImage(product.image || "");

    setLoading(false);
  }, [id]);

  /*
   * Handle input changes
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /*
   * Handle image
   */
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setNewImage(file);

    const preview = URL.createObjectURL(file);

    setImage(preview);
  };

  /*
   * Remove image
   */
  const handleRemoveImage = () => {
    setImage("");
    setNewImage(null);
  };

  /*
   * Submit
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);

    /*
     * API integration will be added later:
     *
     * PUT /api/products/:productId
     *
     * FormData:
     * title
     * category
     * condition
     * location
     * desiredProduct
     * description
     * image
     */

    await new Promise((resolve) => setTimeout(resolve, 900));

    console.log("Updated product:", {
      id,
      ...formData,
      image: newImage,
    });

    setSaving(false);

    navigate(`/products/${id}`);
  };

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="edit-product-page">
        <Navbar />

        <main className="edit-product-main">
          <div className="edit-product-container">
            <div className="edit-product-loading">
              <div className="edit-product-spinner" />

              <p>Loading product...</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <div className="edit-product-page">
        <Navbar />

        <main className="edit-product-main">
          <div className="edit-product-container">
            <div className="edit-product-error">
              <div className="edit-product-error-icon">!</div>

              <h2>Product not found</h2>

              <p>We couldn't find the product you're trying to edit.</p>

              <button onClick={() => navigate("/my-products")}>
                Back to My Products
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <Navbar />

      <main className="edit-product-main">
        <div className="edit-product-container">
          {/* =============================== */}
          {/* Back */}
          {/* =============================== */}

          <button
            className="edit-product-back"
            onClick={() => navigate("/my-products")}
          >
            <ArrowLeft size={14} />
            Back to My Products
          </button>

          {/* =============================== */}
          {/* Header */}
          {/* =============================== */}

          <section className="edit-product-header">
            <div>
              <span>MY PRODUCT</span>

              <h1>Edit Product</h1>

              <p>Update your product information before saving your changes.</p>
            </div>
          </section>

          {/* =============================== */}
          {/* Form */}
          {/* =============================== */}

          <form className="edit-product-form" onSubmit={handleSubmit}>
            <div className="edit-product-layout">
              {/* ======================= */}
              {/* Left - Images */}
              {/* ======================= */}

              <div className="edit-product-left">
                <div className="edit-product-section">
                  <div className="edit-product-section-heading">
                    <div>
                      <h2>Product Image</h2>

                      <p>Use a clear image that shows the product properly.</p>
                    </div>

                    <span>OPTIONAL</span>
                  </div>

                  {/* Image Preview */}

                  <div
                    className={
                      image
                        ? "edit-product-image-preview has-image"
                        : "edit-product-image-preview"
                    }
                  >
                    {image ? (
                      <>
                        <img src={image} alt={formData.title} />

                        <button
                          type="button"
                          className="edit-product-remove-image"
                          onClick={handleRemoveImage}
                        >
                          <X size={15} />
                        </button>
                      </>
                    ) : (
                      <label className="edit-product-upload">
                        <ImagePlus size={24} />

                        <strong>Add Product Image</strong>

                        <span>JPG, PNG or WEBP</span>

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>

                  {image && (
                    <label className="edit-product-change-image">
                      <ImagePlus size={13} />
                      Replace Image
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* ======================= */}
              {/* Right - Details */}
              {/* ======================= */}

              <div className="edit-product-right">
                <div className="edit-product-section">
                  <div className="edit-product-section-heading">
                    <div>
                      <h2>Product Details</h2>

                      <p>Keep your information clear and accurate.</p>
                    </div>

                    <span>REQUIRED</span>
                  </div>

                  {/* Title */}

                  <div className="edit-product-field">
                    <label htmlFor="title">Product Name</label>

                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="e.g. Sony WH-1000XM5"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Category + Condition */}

                  <div className="edit-product-fields-row">
                    <div className="edit-product-field">
                      <label htmlFor="category">Category</label>

                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
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

                    <div className="edit-product-field">
                      <label htmlFor="condition">Condition</label>

                      <select
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select condition</option>

                        <option value="Like New">Like New</option>

                        <option value="Good">Good</option>

                        <option value="Fair">Fair</option>

                        <option value="Used">Used</option>
                      </select>
                    </div>
                  </div>

                  {/* Location */}

                  <div className="edit-product-field">
                    <label htmlFor="location">Location</label>

                    <div className="edit-product-input-icon">
                      <MapPin size={14} />

                      <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="e.g. Pune"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Desired Product */}

                  <div className="edit-product-field">
                    <label htmlFor="desiredProduct">
                      What do you want in exchange?
                    </label>

                    <input
                      id="desiredProduct"
                      name="desiredProduct"
                      type="text"
                      placeholder="e.g. Gaming Keyboard"
                      value={formData.desiredProduct}
                      onChange={handleChange}
                      required
                    />

                    <span className="edit-product-help">
                      Tell other users what you'd like to receive.
                    </span>
                  </div>

                  {/* Description */}

                  <div className="edit-product-field">
                    <label htmlFor="description">Description</label>

                    <textarea
                      id="description"
                      name="description"
                      rows="6"
                      placeholder="Describe your product, its condition, accessories, and anything else buyers should know..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />

                    <div className="edit-product-character-count">
                      {formData.description.length}/ 1000
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =============================== */}
            {/* Bottom Actions */}
            {/* =============================== */}

            <div className="edit-product-actions">
              <button
                type="button"
                className="edit-product-cancel"
                onClick={() => navigate("/my-products")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-product-save"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="edit-product-button-spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EditProduct;
