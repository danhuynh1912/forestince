import type { DashboardOverview } from "../../domain/forestince";
import type { DashboardRepository } from "./dashboard.repository";

export class DashboardService {
  constructor(private repository: DashboardRepository) {}

  async getOverview(): Promise<DashboardOverview> {
    return this.repository.getOverview();
  }
}
