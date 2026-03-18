import type { FacilitiesOverview } from "../../domain/forestince";

export interface FacilitiesRepository {
  getOverview(): Promise<FacilitiesOverview>;
}
