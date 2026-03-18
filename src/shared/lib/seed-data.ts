import type { ForestinceStoreState } from "../../domain/forestince";

export const seedState: ForestinceStoreState = {
  currentAdmin: {
    name: "Elena Wood",
    role: "Super Admin",
    initials: "EW"
  },
  notifications: 3,
  totalBookingsCount: 1284,
  registeredUsersCount: 856,
  mapUpdatedLabel: "Updated 2h ago",
  facilities: [
    {
      id: "old-oak-trail",
      name: "Old Oak Forest Trail",
      zone: "North Canopy",
      category: "Trail",
      capacity: 36,
      usageRate: 84,
      status: "open",
      icon: "trail",
      ambiance: "Guided mindfulness walks and forest bathing loops.",
      nextAvailable: "Today, 4:30 PM",
      weeklyBookings: 31
    },
    {
      id: "zen-garden-deck",
      name: "Zen Garden Deck",
      zone: "East Ridge",
      category: "Deck",
      capacity: 18,
      usageRate: 72,
      status: "open",
      icon: "leaf",
      ambiance: "Sunrise breathing sessions and leadership resets.",
      nextAvailable: "Tomorrow, 7:00 AM",
      weeklyBookings: 24
    },
    {
      id: "silent-retreat-pods",
      name: "Silent Retreat Pods",
      zone: "Moss Quarter",
      category: "Pods",
      capacity: 12,
      usageRate: 61,
      status: "reserve-only",
      icon: "spa",
      ambiance: "Private focus pods for silent offsite sessions.",
      nextAvailable: "Today, 6:15 PM",
      weeklyBookings: 17
    },
    {
      id: "crystal-spring-bath",
      name: "Crystal Spring Bath",
      zone: "South Basin",
      category: "Bath",
      capacity: 10,
      usageRate: 48,
      status: "open",
      icon: "water",
      ambiance: "Recovery and thermal therapy experiences.",
      nextAvailable: "Today, 3:45 PM",
      weeklyBookings: 14
    },
    {
      id: "birch-meditation-hut",
      name: "Birch Meditation Hut",
      zone: "Birch Grove",
      category: "Hut",
      capacity: 14,
      usageRate: 35,
      status: "open",
      icon: "cabin",
      ambiance: "Quiet board reset with guided reflection kits.",
      nextAvailable: "Today, 1:15 PM",
      weeklyBookings: 11
    },
    {
      id: "cedar-canvas-lab",
      name: "Cedar Canvas Lab",
      zone: "West Clearing",
      category: "Workshop",
      capacity: 20,
      usageRate: 41,
      status: "maintenance",
      icon: "facility",
      ambiance: "Team rituals, sketching workshops, and ideation sprints.",
      nextAvailable: "Mar 21, 10:00 AM",
      weeklyBookings: 8
    }
  ],
  recentBookings: [
    {
      id: "booking-001",
      facilityId: "birch-meditation-hut",
      facilityName: "Birch Meditation Hut",
      facilityIcon: "cabin",
      employeeName: "Marcus Arvidson",
      companyName: "North Peak Labs",
      dateLabel: "Oct 24, 09:00 AM",
      status: "confirmed",
      createdAt: "2026-03-18T07:30:00.000Z"
    },
    {
      id: "booking-002",
      facilityId: "crystal-spring-bath",
      facilityName: "Crystal Spring Bath",
      facilityIcon: "water",
      employeeName: "Sarah Jenkins",
      companyName: "Verde Systems",
      dateLabel: "Oct 24, 11:30 AM",
      status: "pending",
      createdAt: "2026-03-18T07:00:00.000Z"
    },
    {
      id: "booking-003",
      facilityId: "old-oak-trail",
      facilityName: "Old Oak Forest Trail",
      facilityIcon: "trail",
      employeeName: "Erik Nilsson",
      companyName: "Meridian Finance",
      dateLabel: "Oct 23, 02:00 PM",
      status: "completed",
      createdAt: "2026-03-17T13:00:00.000Z"
    },
    {
      id: "booking-004",
      facilityId: "zen-garden-deck",
      facilityName: "Zen Garden Deck",
      facilityIcon: "leaf",
      employeeName: "Lina Bergman",
      companyName: "Aster Growth",
      dateLabel: "Oct 23, 10:00 AM",
      status: "completed",
      createdAt: "2026-03-17T09:30:00.000Z"
    },
    {
      id: "booking-005",
      facilityId: "silent-retreat-pods",
      facilityName: "Silent Retreat Pods",
      facilityIcon: "spa",
      employeeName: "Thomas Muller",
      companyName: "Craft & Loom",
      dateLabel: "Oct 23, 08:30 AM",
      status: "cancelled",
      createdAt: "2026-03-17T08:00:00.000Z"
    }
  ],
  pendingRequests: [
    {
      id: "request-101",
      facilityId: "old-oak-trail",
      facilityName: "Old Oak Forest Trail",
      facilityIcon: "trail",
      requesterName: "Ava Morgan",
      companyName: "North Peak Labs",
      headcount: 14,
      dateLabel: "Oct 25, 07:30 AM",
      submittedAt: "18 min ago",
      priority: "high",
      note: "Leadership sunrise walk with guide support and tea station.",
      status: "pending"
    },
    {
      id: "request-102",
      facilityId: "zen-garden-deck",
      facilityName: "Zen Garden Deck",
      facilityIcon: "leaf",
      requesterName: "Kenji Sato",
      companyName: "Aster Growth",
      headcount: 8,
      dateLabel: "Oct 25, 06:45 PM",
      submittedAt: "42 min ago",
      priority: "medium",
      note: "Evening reflection session after strategy workshop.",
      status: "pending"
    },
    {
      id: "request-103",
      facilityId: "birch-meditation-hut",
      facilityName: "Birch Meditation Hut",
      facilityIcon: "cabin",
      requesterName: "Nora Petrov",
      companyName: "Meridian Finance",
      headcount: 6,
      dateLabel: "Oct 26, 01:00 PM",
      submittedAt: "1h ago",
      priority: "standard",
      note: "Small executive reset with private seating configuration.",
      status: "pending"
    },
    {
      id: "request-104",
      facilityId: "crystal-spring-bath",
      facilityName: "Crystal Spring Bath",
      facilityIcon: "water",
      requesterName: "Mina Patel",
      companyName: "Verde Systems",
      headcount: 10,
      dateLabel: "Oct 26, 09:30 AM",
      submittedAt: "1h 25m ago",
      priority: "high",
      note: "Recovery block after campus clean-air workshop.",
      status: "pending"
    }
  ],
  resolvedRequests: [
    {
      id: "request-090",
      facilityId: "zen-garden-deck",
      facilityName: "Zen Garden Deck",
      facilityIcon: "leaf",
      requesterName: "Leah Cooper",
      companyName: "Foundry North",
      headcount: 9,
      dateLabel: "Oct 22, 07:00 AM",
      submittedAt: "Yesterday",
      priority: "medium",
      note: "Approved for a guided sunrise reflection session.",
      status: "approved"
    },
    {
      id: "request-091",
      facilityId: "cedar-canvas-lab",
      facilityName: "Cedar Canvas Lab",
      facilityIcon: "facility",
      requesterName: "Owen Chen",
      companyName: "Meridian Finance",
      headcount: 16,
      dateLabel: "Oct 22, 04:00 PM",
      submittedAt: "Yesterday",
      priority: "standard",
      note: "Declined because the workshop space is still in maintenance.",
      status: "rejected"
    }
  ]
};
