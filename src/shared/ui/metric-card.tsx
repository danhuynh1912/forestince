import { Link } from "react-router-dom";

import type { DashboardMetric } from "../../domain/forestince";
import { Icon } from "../lib/icons";

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  const content = (
    <>
      <div className={`metric-card__icon metric-card__icon--${metric.tone}`}>
        <Icon height={22} name={metric.icon} width={22} />
      </div>
      <div className="metric-card__value-row">
        <div>
          <p className="metric-card__label">{metric.label}</p>
          <strong className="metric-card__value">{metric.value}</strong>
        </div>
        {metric.delta ? (
          <span className="metric-card__delta">{metric.delta}</span>
        ) : metric.eyebrow ? (
          <span className="metric-card__eyebrow">{metric.eyebrow}</span>
        ) : null}
      </div>
    </>
  );

  if (metric.href) {
    return (
      <Link className="metric-card metric-card--link" to={metric.href}>
        {content}
      </Link>
    );
  }

  return <article className="metric-card">{content}</article>;
}
