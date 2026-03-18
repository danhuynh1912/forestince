import type {
  BookingStatus,
  RequestPriority,
  RequestStatus
} from "../../domain/forestince";

type StatusTone = BookingStatus | RequestPriority | RequestStatus | "queue-clear";

export function StatusPill({
  label,
  tone
}: {
  label: string;
  tone: StatusTone;
}) {
  return <span className={`status-pill status-pill--${tone}`}>{label}</span>;
}
