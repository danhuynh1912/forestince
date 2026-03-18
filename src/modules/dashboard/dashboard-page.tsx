import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type {
  BookingRecord,
  DashboardOverview,
  FacilityUsageItem
} from "../../domain/forestince";
import { services } from "../../app/service-registry";
import { Button } from "../../shared/ui/button";
import { MetricCard } from "../../shared/ui/metric-card";
import { ProgressBar } from "../../shared/ui/progress-bar";
import { SectionCard } from "../../shared/ui/section-card";
import { StatusPill } from "../../shared/ui/status-pill";
import { Icon } from "../../shared/lib/icons";
import { useShellSearch } from "../../app/AppShell";

function matchesBooking(booking: BookingRecord, query: string) {
  const term = query.trim().toLowerCase();

  if (!term) {
    return true;
  }

  return [booking.facilityName, booking.employeeName, booking.companyName, booking.status]
    .join(" ")
    .toLowerCase()
    .includes(term);
}

function matchesUsage(item: FacilityUsageItem, query: string) {
  const term = query.trim().toLowerCase();

  if (!term) {
    return true;
  }

  return item.label.toLowerCase().includes(term);
}

function renderStatus(status: BookingRecord["status"]) {
  switch (status) {
    case "confirmed":
      return <StatusPill label="Confirmed" tone="confirmed" />;
    case "pending":
      return <StatusPill label="Pending" tone="pending" />;
    case "completed":
      return <StatusPill label="Completed" tone="completed" />;
    case "cancelled":
      return <StatusPill label="Cancelled" tone="cancelled" />;
    default:
      return null;
  }
}

export function DashboardPage() {
  const { searchQuery } = useShellSearch();
  const deferredQuery = useDeferredValue(searchQuery);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    let active = true;

    services.dashboard.getOverview().then((result) => {
      if (!active) {
        return;
      }

      startTransition(() => {
        setOverview(result);
      });
    });

    return () => {
      active = false;
    };
  }, []);

  if (!overview) {
    return <div className="page-loading">Loading dashboard...</div>;
  }

  const filteredBookings = overview.recentBookings.filter((booking) =>
    matchesBooking(booking, deferredQuery)
  );
  const filteredUsage = overview.facilityUsage.filter((item) =>
    matchesUsage(item, deferredQuery)
  );

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div>
          <p className="hero-card__eyebrow">Nature Campus Admin</p>
          <h1>Forestince operations at a glance.</h1>
          <p className="hero-card__copy">
            This build treats the assignment as a real product slice: fast local data,
            feature boundaries, and a live approval flow that updates the dashboard
            instantly.
          </p>
        </div>
        <div className="hero-card__cta">
          <Button href="/requests" icon={<Icon height={18} name="request" width={18} />}>
            Review Requests
          </Button>
          <Button href="/facilities" variant="secondary">
            Explore Facilities
          </Button>
        </div>
      </section>

      <div className="metrics-grid">
        {overview.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="dashboard-grid">
        <SectionCard
          action={
            <div className="section-actions">
              <Button
                href="/requests"
                icon={<Icon height={18} name="request" width={18} />}
              >
                Add Booking
              </Button>
              <Link className="text-link" to="/requests">
                View All
              </Link>
            </div>
          }
          title="Recent Bookings"
        >
          <div className="desktop-table">
            <table>
              <thead>
                <tr>
                  <th>Facility Name</th>
                  <th>Employee Name</th>
                  <th>Date/Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div className="booking-cell">
                        <span className="facility-icon facility-icon--soft">
                          <Icon
                            height={18}
                            name={booking.facilityIcon}
                            width={18}
                          />
                        </span>
                        <div>
                          <strong>{booking.facilityName}</strong>
                          <p>{booking.companyName}</p>
                        </div>
                      </div>
                    </td>
                    <td>{booking.employeeName}</td>
                    <td>{booking.dateLabel}</td>
                    <td>{renderStatus(booking.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-list">
            {filteredBookings.map((booking) => (
              <article className="list-card" key={booking.id}>
                <div className="list-card__row list-card__row--top">
                  <div className="list-card__facility">
                    <span className="facility-icon facility-icon--soft">
                      <Icon height={18} name={booking.facilityIcon} width={18} />
                    </span>
                    <strong>{booking.facilityName}</strong>
                  </div>
                  {renderStatus(booking.status)}
                </div>
                <div className="list-card__row list-card__row--bottom">
                  <div className="list-card__details">
                    <span>{booking.employeeName}</span>
                    <span>{booking.dateLabel}</span>
                  </div>
                  <Icon height={18} name="chevron-right" width={18} />
                </div>
              </article>
            ))}
          </div>

          {!filteredBookings.length ? (
            <div className="empty-panel">No recent bookings match the current search.</div>
          ) : null}
        </SectionCard>

        <div className="sidebar-stack">
          <SectionCard title="Facility Usage">
            <div className="usage-panel">
              {filteredUsage.map((item) => (
                <ProgressBar key={item.facilityId} label={item.label} value={item.percent} />
              ))}

              <div className="spotlight-card">
                <p>Most Popular This Week</p>
                <strong>{overview.featuredFacility.name}</strong>
                <span>{overview.featuredFacility.ambiance}</span>
              </div>
            </div>
          </SectionCard>

          <Link className="map-card" to="/facilities">
            <div className="map-card__visual">
              <span className="map-card__badge">Campus Map View</span>
            </div>
            <div className="map-card__footer">
              <span>{overview.mapUpdatedLabel}</span>
              <strong>Full Map</strong>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
