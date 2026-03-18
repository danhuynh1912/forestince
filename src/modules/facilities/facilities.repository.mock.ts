import type { FacilitiesOverview } from "../../domain/forestince";
import { mockDb } from "../../shared/lib/mock-db";
import type { FacilitiesRepository } from "./facilities.repository";

export class MockFacilitiesRepository implements FacilitiesRepository {
  async getOverview(): Promise<FacilitiesOverview> {
    return mockDb.getFacilitiesOverview();
  }
}
