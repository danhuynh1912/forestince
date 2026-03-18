import { startTransition, useEffect, useState } from "react";

import type { ReportDigest } from "../../domain/forestince";
import { services } from "../../app/service-registry";
import { Icon } from "../../shared/lib/icons";
import { SectionCard } from "../../shared/ui/section-card";

export function ReportsPage() {
  const [digest, setDigest] = useState<ReportDigest | null>(null);

  useEffect(() => {
    let active = true;

    services.reports.getDigest().then((result) => {
      if (!active) {
        return;
      }

      startTransition(() => {
        setDigest(result);
      });
    });

    return () => {
      active = false;
    };
  }, []);

  if (!digest) {
    return <div className="page-loading">Loading reports...</div>;
  }

  return (
    <div className="page-stack">
      <section className="hero-card hero-card--compact">
        <div>
          <p className="hero-card__eyebrow">Executive Reports</p>
          <h1>Readable signals without a charting tax.</h1>
          <p className="hero-card__copy">
            Reports stay intentionally lean in this scope. The page proves extension
            points for finance, usage, or damage reporting without introducing heavy
            client-side dependencies.
          </p>
        </div>
      </section>

      <div className="report-grid">
        <article className="report-card">
          <span className="facility-icon">
            <Icon height={20} name="trend-up" width={20} />
          </span>
          <p>Projected Revenue</p>
          <strong>{digest.projectedRevenue}</strong>
        </article>
        <article className="report-card">
          <span className="facility-icon">
            <Icon height={20} name="facility" width={20} />
          </span>
          <p>Utilization Target</p>
          <strong>{digest.utilizationTarget}</strong>
        </article>
        <article className="report-card">
          <span className="facility-icon">
            <Icon height={20} name="pending" width={20} />
          </span>
          <p>Demand Pressure</p>
          <strong>{digest.demandPressure}</strong>
        </article>
        <article className="report-card">
          <span className="facility-icon">
            <Icon height={20} name="spark" width={20} />
          </span>
          <p>Maintenance Risk</p>
          <strong>{digest.maintenanceRisk}</strong>
        </article>
      </div>

      <SectionCard title="Why this page exists">
        <ul className="notes-list">
          <li>It demonstrates that the dashboard can grow into richer reporting views.</li>
          <li>It keeps the rendering budget small, which aligns with the performance goal.</li>
          <li>It shows one more vertical slice without bloating the assignment scope.</li>
        </ul>
      </SectionCard>
    </div>
  );
}
