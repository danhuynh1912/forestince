import type {
  BookingRecord,
  DashboardOverview,
  Facility,
  FacilityUsageItem,
  ForestinceStoreState,
  PendingRequest,
  RequestInboxSummary,
  ReportDigest
} from "../../domain/forestince";
import { formatCompactNumber, formatPercent } from "./format";
import { seedState } from "./seed-data";

const STORAGE_KEY = "forestince-admin-state";

function cloneState(state: ForestinceStoreState): ForestinceStoreState {
  return JSON.parse(JSON.stringify(state)) as ForestinceStoreState;
}

function loadState(): ForestinceStoreState {
  if (typeof window === "undefined") {
    return cloneState(seedState);
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return cloneState(seedState);
  }

  try {
    return JSON.parse(stored) as ForestinceStoreState;
  } catch {
    return cloneState(seedState);
  }
}

let state = loadState();

function persistState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function findFacility(facilityId: string): Facility {
  const facility = state.facilities.find((item) => item.id === facilityId);

  if (!facility) {
    throw new Error(`Facility ${facilityId} not found`);
  }

  return facility;
}

function buildMetrics(snapshot: ForestinceStoreState): DashboardOverview["metrics"] {
  const activeFacilities = snapshot.facilities.filter(
    (facility) => facility.status !== "maintenance"
  ).length;

  return [
    {
      id: "total-bookings",
      label: "Total Bookings",
      value: formatCompactNumber(snapshot.totalBookingsCount),
      delta: "+12%",
      tone: "forest",
      icon: "calendar"
    },
    {
      id: "active-facilities",
      label: "Active Facilities",
      value: formatCompactNumber(activeFacilities),
      eyebrow: "Live estate",
      tone: "aqua",
      icon: "facility",
      href: "/facilities"
    },
    {
      id: "registered-users",
      label: "Registered Users",
      value: formatCompactNumber(snapshot.registeredUsersCount),
      delta: "+5.2%",
      tone: "aqua",
      icon: "users"
    },
    {
      id: "pending-requests",
      label: "Pending Requests",
      value: formatCompactNumber(snapshot.pendingRequests.length),
      eyebrow:
        snapshot.pendingRequests.length > 0
          ? `${snapshot.pendingRequests.filter((item) => item.priority === "high").length} urgent`
          : "Queue clear",
      tone: "sun",
      icon: "pending",
      href: "/requests"
    }
  ];
}

function buildFacilityUsage(facilities: Facility[]): FacilityUsageItem[] {
  return facilities
    .slice()
    .sort((left, right) => right.usageRate - left.usageRate)
    .slice(0, 5)
    .map((facility) => ({
      facilityId: facility.id,
      label: facility.name,
      percent: facility.usageRate
    }));
}

function buildRequestSummary(requests: PendingRequest[]): RequestInboxSummary {
  const totalHeadcount = requests.reduce((sum, item) => sum + item.headcount, 0);
  const highPriority = requests.filter((item) => item.priority === "high").length;

  return {
    totalPending: requests.length,
    highPriority,
    averageHeadcount:
      requests.length > 0 ? `${Math.round(totalHeadcount / requests.length)} pax` : "0 pax",
    nextDecisionWindow: highPriority > 0 ? "Within 30 minutes" : "Within 2 hours"
  };
}

function buildResolvedRequest(
  request: PendingRequest,
  status: "approved" | "rejected"
): PendingRequest {
  return {
    ...request,
    status,
    submittedAt: "Just now"
  };
}

export const mockDb = {
  getState(): ForestinceStoreState {
    return cloneState(state);
  },

  getDashboardOverview(): DashboardOverview {
    const snapshot = this.getState();
    const featuredFacility =
      snapshot.facilities.slice().sort((left, right) => right.usageRate - left.usageRate)[0] ??
      snapshot.facilities[0];

    return {
      metrics: buildMetrics(snapshot),
      recentBookings: snapshot.recentBookings,
      facilityUsage: buildFacilityUsage(snapshot.facilities),
      featuredFacility,
      activeRequestCount: snapshot.pendingRequests.length,
      attentionRequestCount: snapshot.pendingRequests.filter((item) => item.priority === "high")
        .length,
      mapUpdatedLabel: snapshot.mapUpdatedLabel
    };
  },

  getFacilitiesOverview() {
    const snapshot = this.getState();
    const sorted = snapshot.facilities.slice().sort((left, right) => right.usageRate - left.usageRate);
    const averageUsage =
      snapshot.facilities.reduce((sum, facility) => sum + facility.usageRate, 0) /
      snapshot.facilities.length;

    return {
      facilities: sorted,
      averageUsage,
      highestUsageFacility: sorted[0]
    };
  },

  getPendingRequests() {
    const snapshot = this.getState();
    const requests = snapshot.pendingRequests.slice().sort((left, right) => {
      const rank = { high: 0, medium: 1, standard: 2 };
      return rank[left.priority] - rank[right.priority];
    });
    const resolvedRequests = snapshot.resolvedRequests.slice();

    return {
      summary: buildRequestSummary(requests),
      requests,
      resolvedRequests
    };
  },

  approveRequest(requestId: string) {
    const request = state.pendingRequests.find((item) => item.id === requestId);

    if (!request) {
      throw new Error("Request not found");
    }

    const resolvedRequest = buildResolvedRequest(request, "approved");
    state.pendingRequests = state.pendingRequests.filter((item) => item.id !== requestId);
    state.resolvedRequests = [resolvedRequest, ...state.resolvedRequests].slice(0, 6);
    state.totalBookingsCount += 1;

    const facility = findFacility(request.facilityId);
    facility.usageRate = Math.min(96, facility.usageRate + 3);
    facility.weeklyBookings += 1;

    const booking: BookingRecord = {
      id: `booking-${Date.now()}`,
      facilityId: request.facilityId,
      facilityName: request.facilityName,
      facilityIcon: request.facilityIcon,
      employeeName: request.requesterName,
      companyName: request.companyName,
      dateLabel: request.dateLabel,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    state.recentBookings = [booking, ...state.recentBookings].slice(0, 6);
    persistState();

    return booking;
  },

  rejectRequest(requestId: string) {
    const request = state.pendingRequests.find((item) => item.id === requestId);

    if (!request) {
      throw new Error("Request not found");
    }

    const resolvedRequest = buildResolvedRequest(request, "rejected");
    state.pendingRequests = state.pendingRequests.filter((item) => item.id !== requestId);
    state.resolvedRequests = [resolvedRequest, ...state.resolvedRequests].slice(0, 6);
    persistState();

    return resolvedRequest;
  },

  getReportDigest(): ReportDigest {
    const snapshot = this.getState();
    const averageUsage =
      snapshot.facilities.reduce((sum, facility) => sum + facility.usageRate, 0) /
      snapshot.facilities.length;
    const highestDemand = snapshot.pendingRequests.filter((item) => item.priority === "high").length;

    return {
      projectedRevenue: "$86,400",
      utilizationTarget: formatPercent(averageUsage),
      demandPressure: highestDemand > 0 ? `${highestDemand} urgent queues` : "Balanced",
      maintenanceRisk: snapshot.facilities.some((item) => item.status === "maintenance")
        ? "1 facility flagged"
        : "All clear"
    };
  },

  reset() {
    state = cloneState(seedState);
    persistState();
  }
};
