import type { DashboardOverview } from "../../domain/forestince";
import { mockDb } from "../../shared/lib/mock-db";
import type { DashboardRepository } from "./dashboard.repository";

export class MockDashboardRepository implements DashboardRepository {
  async getOverview(): Promise<DashboardOverview> {
    return mockDb.getDashboardOverview();
  }
}
