import { PackageOpen } from "lucide-react";
import Button from "./Button";
import "../../styles/common/empty-state.css";

function EmptyState({
  icon,
  title = "Nothing here yet",
  message = "There is nothing to display.",
  actionText,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon || <PackageOpen size={34} />}</div>

      <h3>{title}</h3>

      <p>{message}</p>

      {actionText && <Button onClick={onAction}>{actionText}</Button>}
    </div>
  );
}

export default EmptyState;
