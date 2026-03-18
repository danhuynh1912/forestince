import { useId } from "react";

import { Button } from "./button";

interface DevelopmentModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
  actionLabel?: string;
}

export function DevelopmentModal({
  open,
  onClose,
  message = "This feature is in development",
  actionLabel = "OK"
}: DevelopmentModalProps) {
  const titleId = useId();

  if (!open) {
    return null;
  }

  return (
    <div
      aria-hidden={false}
      className="development-modal"
      onClick={onClose}
      role="presentation"
    >
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="development-modal__card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <p id={titleId}>{message}</p>
        <div className="development-modal__actions">
          <Button onClick={onClose} variant="primary">
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
