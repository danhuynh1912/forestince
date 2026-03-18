import type { FacilitiesOverview } from "../../domain/forestince";
import type { FacilitiesRepository } from "./facilities.repository";

export class FacilitiesService {
  constructor(private repository: FacilitiesRepository) {}

  async getOverview(): Promise<FacilitiesOverview> {
    return this.repository.getOverview();
  }
}
