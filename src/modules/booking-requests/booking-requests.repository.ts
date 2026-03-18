import type { PendingRequest, RequestInbox } from "../../domain/forestince";

export interface BookingRequestsRepository {
  getInbox(): Promise<RequestInbox>;
  approveRequest(id: string): Promise<void>;
  rejectRequest(id: string): Promise<PendingRequest>;
}
