import type { DashboardOverview } from "../../domain/forestince";

export interface DashboardRepository {
  getOverview(): Promise<DashboardOverview>;
}
