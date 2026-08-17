import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Om Shete",
    username: "@omshete",
    email: "om@example.com",
    phone: "+91 98765 43210",
    location: "Pune, Maharashtra",
    bio: "Tech enthusiast who loves discovering useful products and trading things I no longer need.",
  });

  const [avatar, setAvatar] = useState("https://i.pravatar.cc/300?img=12");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  /*
   * Handle input changes
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess(false);
  };

  /*
   * Handle avatar change
   */
  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile image must be smaller than 5MB.");

      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setAvatar(imageUrl);

    setError("");
  };

  /*
   * Submit form
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (!formData.name.trim()) {
      setError("Please enter your name.");

      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");

      return;
    }

    if (!formData.location.trim()) {
      setError("Please enter your location.");

      return;
    }

    setLoading(true);

    /*
     * Temporary API simulation.
     *
     * Later this will become:
     *
     * PUT /api/users/:userId
     */

    setTimeout(() => {
      setLoading(false);

      setSuccess("Profile updated successfully.");
    }, 1000);
  };

  /*
   * Cancel
   */
  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="edit-profile-page">
      <Navbar />

      <main className="edit-profile-main">
        <div className="edit-profile-container">
          {/* ================================= */}
          {/* Page Header */}
          {/* ================================= */}

          <div className="edit-profile-page-header">
            <button
              type="button"
              className="edit-profile-back"
              onClick={handleCancel}
            >
              <ArrowLeft size={15} />
              Back to Profile
            </button>

            <div>
              <span>ACCOUNT SETTINGS</span>

              <h1>Edit Profile</h1>

              <p>Update your personal information and profile details.</p>
            </div>
          </div>

          {/* ================================= */}
          {/* Form Card */}
          {/* ================================= */}

          <form className="edit-profile-card" onSubmit={handleSubmit}>
            {/* ================================= */}
            {/* Avatar */}
            {/* ================================= */}

            <section className="edit-profile-avatar-section">
              <div className="edit-profile-avatar-wrapper">
                <img
                  src={avatar}
                  alt="Profile"
                  className="edit-profile-avatar"
                />

                <label
                  htmlFor="avatar-upload"
                  className="edit-profile-camera"
                  title="Change profile photo"
                >
                  <Camera size={15} />

                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <div className="edit-profile-avatar-info">
                <h2>Profile Photo</h2>

                <p>
                  Add a clear photo so other users know who they're swapping
                  with.
                </p>

                <span>JPG, PNG or WEBP · Max 5MB</span>
              </div>
            </section>

            {/* ================================= */}
            {/* Divider */}
            {/* ================================= */}

            <div className="edit-profile-divider" />

            {/* ================================= */}
            {/* Basic Information */}
            {/* ================================= */}

            <section className="edit-profile-section">
              <div className="edit-profile-section-heading">
                <span>PERSONAL</span>

                <h2>Basic Information</h2>
              </div>

              <div className="edit-profile-form-grid">
                {/* Name */}

                <div className="edit-profile-field">
                  <label htmlFor="name">Full Name</label>

                  <div className="edit-profile-input-wrapper">
                    <User size={15} />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                {/* Username */}

                <div className="edit-profile-field">
                  <label htmlFor="username">Username</label>

                  <div className="edit-profile-input-wrapper">
                    <span className="edit-profile-input-symbol">@</span>

                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username.replace("@", "")}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          username: event.target.value.startsWith("@")
                            ? event.target.value
                            : `@${event.target.value}`,
                        }))
                      }
                      placeholder="username"
                    />
                  </div>

                  <small>Your username is visible to other users.</small>
                </div>

                {/* Email */}

                <div className="edit-profile-field">
                  <label htmlFor="email">Email Address</label>

                  <div className="edit-profile-input-wrapper">
                    <Mail size={15} />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}

                <div className="edit-profile-field">
                  <label htmlFor="phone">Phone Number</label>

                  <div className="edit-profile-input-wrapper">
                    <Phone size={15} />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Location */}

                <div className="edit-profile-field edit-profile-full-field">
                  <label htmlFor="location">Location</label>

                  <div className="edit-profile-input-wrapper">
                    <MapPin size={15} />

                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State"
                    />
                  </div>

                  <small>Your location helps people find nearby swaps.</small>
                </div>
              </div>
            </section>

            {/* ================================= */}
            {/* Bio */}
            {/* ================================= */}

            <section className="edit-profile-section">
              <div className="edit-profile-section-heading">
                <span>ABOUT YOU</span>

                <h2>Profile Bio</h2>
              </div>

              <div className="edit-profile-field">
                <label htmlFor="bio">Bio</label>

                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={300}
                  placeholder="Tell the BarterX community a little about yourself..."
                />

                <div className="edit-profile-character-count">
                  {formData.bio.length} / 300
                </div>
              </div>
            </section>

            {/* ================================= */}
            {/* Account Status */}
            {/* ================================= */}

            <section className="edit-profile-account-status">
              <div className="edit-profile-status-icon">
                <CheckCircle size={17} />
              </div>

              <div>
                <strong>Account Verified</strong>

                <p>Your email address has been verified.</p>
              </div>

              <span>Verified</span>
            </section>

            {/* ================================= */}
            {/* Error */}
            {/* ================================= */}

            {error && <div className="edit-profile-message error">{error}</div>}

            {/* ================================= */}
            {/* Success */}
            {/* ================================= */}

            {success && (
              <div className="edit-profile-message success">{success}</div>
            )}

            {/* ================================= */}
            {/* Actions */}
            {/* ================================= */}

            <div className="edit-profile-actions">
              <button
                type="button"
                className="edit-profile-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="edit-profile-save"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="edit-profile-button-spinner" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
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

export default EditProfile;
