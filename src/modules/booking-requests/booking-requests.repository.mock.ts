import type { PendingRequest, RequestInbox } from "../../domain/forestince";
import { mockDb } from "../../shared/lib/mock-db";
import type { BookingRequestsRepository } from "./booking-requests.repository";

export class MockBookingRequestsRepository implements BookingRequestsRepository {
  async getInbox(): Promise<RequestInbox> {
    return mockDb.getPendingRequests();
  }

  async approveRequest(id: string): Promise<void> {
    mockDb.approveRequest(id);
  }

  async rejectRequest(id: string): Promise<PendingRequest> {
    return mockDb.rejectRequest(id);
  }
}
