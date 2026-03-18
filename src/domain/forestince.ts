export type NavKey =
  | "dashboard"
  | "facilities"
  | "requests"
  | "reports"
  | "booking-rules"
  | "geoson"
  | "users"
  | "settings";

export type MetricTone = "forest" | "aqua" | "sun" | "clay";

export type IconKey =
  | "dashboard"
  | "calendar"
  | "facility"
  | "users"
  | "pending"
  | "reports"
  | "map"
  | "settings"
  | "search"
  | "bell"
  | "chevron-right"
  | "menu"
  | "request"
  | "leaf"
  | "trail"
  | "spa"
  | "water"
  | "cabin"
  | "layers"
  | "rule"
  | "trend-up"
  | "spark";

export interface NavItem {
  key: NavKey;
  label: string;
  href?: string;
  icon: IconKey;
  mobileLabel?: string;
  disabled?: boolean;
}

export interface AdminProfile {
  name: string;
  role: string;
  initials: string;
}

export interface Facility {
  id: string;
  name: string;
  zone: string;
  category: string;
  capacity: number;
  usageRate: number;
  status: "open" | "maintenance" | "reserve-only";
  icon: IconKey;
  ambiance: string;
  nextAvailable: string;
  weeklyBookings: number;
}

export type BookingStatus =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled";

export interface BookingRecord {
  id: string;
  facilityId: string;
  facilityName: string;
  facilityIcon: IconKey;
  employeeName: string;
  companyName: string;
  dateLabel: string;
  status: BookingStatus;
  createdAt: string;
}

export type RequestPriority = "high" | "medium" | "standard";
export type RequestStatus = "pending" | "approved" | "rejected";

export interface PendingRequest {
  id: string;
  facilityId: string;
  facilityName: string;
  facilityIcon: IconKey;
  requesterName: string;
  companyName: string;
  headcount: number;
  dateLabel: string;
  submittedAt: string;
  priority: RequestPriority;
  note: string;
  status: RequestStatus;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  delta?: string;
  eyebrow?: string;
  tone: MetricTone;
  icon: IconKey;
  href?: string;
}

export interface FacilityUsageItem {
  facilityId: string;
  label: string;
  percent: number;
}

export interface DashboardOverview {
  metrics: DashboardMetric[];
  recentBookings: BookingRecord[];
  facilityUsage: FacilityUsageItem[];
  featuredFacility: Facility;
  activeRequestCount: number;
  attentionRequestCount: number;
  mapUpdatedLabel: string;
}

export interface RequestInboxSummary {
  totalPending: number;
  highPriority: number;
  averageHeadcount: string;
  nextDecisionWindow: string;
}

export interface RequestInbox {
  summary: RequestInboxSummary;
  requests: PendingRequest[];
  resolvedRequests: PendingRequest[];
}

export interface FacilitiesOverview {
  facilities: Facility[];
  averageUsage: number;
  highestUsageFacility: Facility;
}

export interface ReportDigest {
  projectedRevenue: string;
  utilizationTarget: string;
  demandPressure: string;
  maintenanceRisk: string;
}

export interface ForestinceStoreState {
  currentAdmin: AdminProfile;
  notifications: number;
  totalBookingsCount: number;
  registeredUsersCount: number;
  mapUpdatedLabel: string;
  facilities: Facility[];
  recentBookings: BookingRecord[];
  pendingRequests: PendingRequest[];
  resolvedRequests: PendingRequest[];
}
