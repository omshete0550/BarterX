import { Camera, ImagePlus, LoaderCircle, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import "./VisualSearchButton.css";

function VisualSearchButton({ onSearch, loading = false, initiallyOpen = false }) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(initiallyOpen);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initiallyOpen) setOpen(true);
  }, [initiallyOpen]);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const selectImage = (event) => {
    const selectedImage = event.target.files?.[0];
    if (!selectedImage) return;

    if (!selectedImage.type.startsWith("image/")) {
      setError("Choose a JPG, PNG, or WEBP image.");
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      setError("Choose an image smaller than 5 MB.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImage(selectedImage);
    setPreviewUrl(URL.createObjectURL(selectedImage));
    setError("");
  };

  const clearImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImage(null);
    setPreviewUrl("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const submitVisualSearch = async () => {
    if (!image) {
      setError("Take or select a product photo first.");
      return;
    }

    try {
      await onSearch(image);
      setOpen(false);
    } catch (requestError) {
      setError(requestError || "We could not search with this image.");
    }
  };

  return (
    <div className="visual-search">
      <button
        type="button"
        className="visual-search-trigger"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
      >
        <Camera size={16} />
        Search by photo
      </button>

      {open && (
        <div className="visual-search-panel">
          <div className="visual-search-panel-header">
            <div>
              <span>VISUAL SEARCH</span>
              <strong>Take or upload a product photo</strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close photo search">
              <X size={17} />
            </button>
          </div>

          <input
            ref={inputRef}
            className="visual-search-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            onChange={selectImage}
          />

          {previewUrl ? (
            <div className="visual-search-preview">
              <img src={previewUrl} alt="Selected product" />
              <button type="button" onClick={clearImage} aria-label="Remove selected image">
                <X size={16} />
              </button>
            </div>
          ) : (
            <button type="button" className="visual-search-select" onClick={() => inputRef.current?.click()}>
              <ImagePlus size={20} />
              <span>Use camera or choose an image</span>
              <small>JPG, PNG, or WEBP up to 5 MB</small>
            </button>
          )}

          {error && <p className="visual-search-error">{error}</p>}

          <button
            type="button"
            className="visual-search-submit"
            onClick={submitVisualSearch}
            disabled={loading}
          >
            {loading ? <LoaderCircle size={16} className="visual-search-spinner" /> : <Search size={16} />}
            {loading ? "Finding matches..." : "Find similar products"}
          </button>
        </div>
      )}
    </div>
  );
}

export default VisualSearchButton;
