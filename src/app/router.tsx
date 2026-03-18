import { createBrowserRouter } from "react-router-dom";

import { AppShell } from "./AppShell";
import { BookingRequestsPage } from "../modules/booking-requests/booking-requests-page";
import { DashboardPage } from "../modules/dashboard/dashboard-page";
import { FacilitiesPage } from "../modules/facilities/facilities-page";
import { ReportsPage } from "../modules/reports/reports-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "requests",
        element: <BookingRequestsPage />
      },
      {
        path: "facilities",
        element: <FacilitiesPage />
      },
      {
        path: "reports",
        element: <ReportsPage />
      }
    ]
  }
]);
