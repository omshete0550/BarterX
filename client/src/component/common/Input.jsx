import { AlertCircle } from "lucide-react";
import "../../styles/common/input.css";

function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
}) {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input-field ${error ? "input-error" : ""}`}
      />

      {error && (
        <div className="input-error-message">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {!error && helperText && <p className="input-helper">{helperText}</p>}
    </div>
  );
}

export default Input;
