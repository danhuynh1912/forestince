import type { DashboardOverview, RequestInbox } from "../../domain/forestince";
import type { DashboardRepository } from "../dashboard/dashboard.repository";
import type { BookingRequestsRepository } from "./booking-requests.repository";

export interface ResolveRequestResult {
  inbox: RequestInbox;
  dashboard: DashboardOverview;
}

export class BookingRequestsService {
  constructor(
    private repository: BookingRequestsRepository,
    private dashboardRepository: DashboardRepository
  ) {}

  async getInbox(): Promise<RequestInbox> {
    return this.repository.getInbox();
  }

  async approveRequest(id: string): Promise<ResolveRequestResult> {
    await this.repository.approveRequest(id);

    const [inbox, dashboard] = await Promise.all([
      this.repository.getInbox(),
      this.dashboardRepository.getOverview()
    ]);

    return { inbox, dashboard };
  }

  async rejectRequest(id: string): Promise<ResolveRequestResult> {
    await this.repository.rejectRequest(id);

    const [inbox, dashboard] = await Promise.all([
      this.repository.getInbox(),
      this.dashboardRepository.getOverview()
    ]);

    return { inbox, dashboard };
  }
}
