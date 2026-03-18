import { MockBookingRequestsRepository } from "../modules/booking-requests/booking-requests.repository.mock";
import { BookingRequestsService } from "../modules/booking-requests/booking-requests.service";
import { MockDashboardRepository } from "../modules/dashboard/dashboard.repository.mock";
import { DashboardService } from "../modules/dashboard/dashboard.service";
import { MockFacilitiesRepository } from "../modules/facilities/facilities.repository.mock";
import { FacilitiesService } from "../modules/facilities/facilities.service";
import { mockDb } from "../shared/lib/mock-db";

const dashboardRepository = new MockDashboardRepository();
const bookingRequestsRepository = new MockBookingRequestsRepository();
const facilitiesRepository = new MockFacilitiesRepository();

export const services = {
  dashboard: new DashboardService(dashboardRepository),
  requests: new BookingRequestsService(bookingRequestsRepository, dashboardRepository),
  facilities: new FacilitiesService(facilitiesRepository),
  reports: {
    async getDigest() {
      return mockDb.getReportDigest();
    }
  },
  resetDemo() {
    mockDb.reset();
  }
};
