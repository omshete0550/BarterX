import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Camera,
  MapPin,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";
import { getMyProfile, updateMyProfile } from "../../features/auth/authSlice";

import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error: apiError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    // This is a local draft: populate it once the authenticated profile arrives.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",
    });
    setAvatar(user.avatar || "https://i.pravatar.cc/300?img=12");
  }, [user]);

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
    setAvatarFile(file);

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

    const result = await dispatch(
      updateMyProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        bio: formData.bio.trim(),
        ...(avatarFile ? { avatarFile } : { avatar }),
      }),
    );

    if (updateMyProfile.fulfilled.match(result)) {
      setSuccess("Profile updated successfully.");
    }
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
                  <span>Change photo</span>

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

                <span>JPG, PNG, or WEBP · Up to 5MB</span>
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
                      required
                    />
                  </div>
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
                      placeholder="you@example.com"
                      disabled
                    />
                  </div>

                  <small>Email is managed with your account and can’t be changed here.</small>
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
                      required
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
            {/* Error */}
            {/* ================================= */}

            {(error || apiError) && (
              <div className="edit-profile-message error" role="alert">
                {error || apiError}
              </div>
            )}

            {/* ================================= */}
            {/* Success */}
            {/* ================================= */}

            {success && (
              <div className="edit-profile-message success" role="status">
                {success}
              </div>
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
