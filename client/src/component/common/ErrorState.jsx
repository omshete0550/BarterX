import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import "../../styles/common/error-state.css";

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-state">
      <div className="error-icon">
        <AlertTriangle size={32} />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
