import { startTransition, useDeferredValue, useEffect, useState } from "react";

import type { FacilitiesOverview, Facility } from "../../domain/forestince";
import { useShellSearch } from "../../app/AppShell";
import { services } from "../../app/service-registry";
import { Icon } from "../../shared/lib/icons";
import { ProgressBar } from "../../shared/ui/progress-bar";
import { SectionCard } from "../../shared/ui/section-card";
import { StatusPill } from "../../shared/ui/status-pill";

function matchesFacility(facility: Facility, query: string) {
  const term = query.trim().toLowerCase();

  if (!term) {
    return true;
  }

  return [facility.name, facility.zone, facility.category, facility.ambiance]
    .join(" ")
    .toLowerCase()
    .includes(term);
}

export function FacilitiesPage() {
  const { searchQuery } = useShellSearch();
  const deferredQuery = useDeferredValue(searchQuery);
  const [overview, setOverview] = useState<FacilitiesOverview | null>(null);

  useEffect(() => {
    let active = true;

    services.facilities.getOverview().then((result) => {
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
    return <div className="page-loading">Loading facilities...</div>;
  }

  const visibleFacilities = overview.facilities.filter((facility) =>
    matchesFacility(facility, deferredQuery)
  );

  return (
    <div className="page-stack">
      <section className="hero-card hero-card--compact">
        <div>
          <p className="hero-card__eyebrow">Facility Usage</p>
          <h1>Operational view of the campus footprint.</h1>
          <p className="hero-card__copy">
            This page extends the dashboard with a more detailed facilities layer:
            current pressure, next availability, and a map-inspired surface for
            orientation.
          </p>
        </div>
        <div className="hero-card__mini-metrics">
          <article>
            <span>Average usage</span>
            <strong>{Math.round(overview.averageUsage)}%</strong>
          </article>
          <article>
            <span>Highest pressure</span>
            <strong>{overview.highestUsageFacility.name}</strong>
          </article>
        </div>
      </section>

      <div className="split-layout">
        <SectionCard title="Live Facilities">
          <div className="facility-grid">
            {visibleFacilities.map((facility) => (
              <article className="facility-card" key={facility.id}>
                <div className="facility-card__top">
                  <span className="facility-icon">
                    <Icon height={20} name={facility.icon} width={20} />
                  </span>
                  <div>
                    <strong>{facility.name}</strong>
                    <p>
                      {facility.zone} · {facility.category}
                    </p>
                  </div>
                </div>
                <ProgressBar
                  label="Current usage"
                  subtitle={`${facility.weeklyBookings} bookings this week`}
                  value={facility.usageRate}
                />
                <div className="facility-card__meta">
                  <span>{facility.capacity} people</span>
                  <span>{facility.nextAvailable}</span>
                </div>
                <p className="facility-card__copy">{facility.ambiance}</p>
                <StatusPill
                  label={facility.status.replace("-", " ")}
                  tone={facility.status === "maintenance" ? "pending" : "confirmed"}
                />
              </article>
            ))}
          </div>

          {!visibleFacilities.length ? (
            <div className="empty-panel">No facilities match the current search.</div>
          ) : null}
        </SectionCard>

        <div className="sidebar-stack">
          <SectionCard title="Campus Map">
            <div className="map-panel">
              <div className="map-panel__visual">
                <span className="map-pin map-pin--one">Trail Loop</span>
                <span className="map-pin map-pin--two">Zen Deck</span>
                <span className="map-pin map-pin--three">Spring Bath</span>
              </div>
              <p>
                The map block is intentionally light-weight: no heavy GIS dependency in
                this prototype, but the UI contract leaves room for a real map layer or
                GeoSON integration later.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Playbook">
            <ul className="notes-list">
              <li>Trail and deck spaces absorb most leadership offsites.</li>
              <li>Pods remain reserve-only to protect premium availability.</li>
              <li>Canvas Lab is flagged for maintenance and excluded from active capacity.</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
