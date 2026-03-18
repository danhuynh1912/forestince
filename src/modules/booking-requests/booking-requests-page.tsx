import { startTransition, useDeferredValue, useEffect, useState } from "react";

import type {
  DashboardOverview,
  PendingRequest,
  RequestInbox
} from "../../domain/forestince";
import { useShellSearch } from "../../app/AppShell";
import { services } from "../../app/service-registry";
import { Icon } from "../../shared/lib/icons";
import { Button } from "../../shared/ui/button";
import { SectionCard } from "../../shared/ui/section-card";
import { StatusPill } from "../../shared/ui/status-pill";

function matchesRequest(request: PendingRequest, query: string) {
  const term = query.trim().toLowerCase();

  if (!term) {
    return true;
  }

  return [
    request.facilityName,
    request.requesterName,
    request.companyName,
    request.note,
    request.priority
  ]
    .join(" ")
    .toLowerCase()
    .includes(term);
}

export function BookingRequestsPage() {
  const { searchQuery } = useShellSearch();
  const deferredQuery = useDeferredValue(searchQuery);
  const [inbox, setInbox] = useState<RequestInbox | null>(null);
  const [dashboard, setDashboard] = useState<DashboardOverview | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([services.requests.getInbox(), services.dashboard.getOverview()]).then(
      ([requestInbox, dashboardOverview]) => {
        if (!active) {
          return;
        }

        startTransition(() => {
          setInbox(requestInbox);
          setDashboard(dashboardOverview);
        });
      }
    );

    return () => {
      active = false;
    };
  }, []);

  if (!inbox || !dashboard) {
    return <div className="page-loading">Loading request queue...</div>;
  }

  const visibleRequests = inbox.requests.filter((request) =>
    matchesRequest(request, deferredQuery)
  );
  const visibleResolvedRequests = inbox.resolvedRequests.filter((request) =>
    matchesRequest(request, deferredQuery)
  );

  function renderResolutionStatus(status: PendingRequest["status"]) {
    if (status === "approved") {
      return <StatusPill label="Approved" tone="approved" />;
    }

    if (status === "rejected") {
      return <StatusPill label="Rejected" tone="rejected" />;
    }

    return <StatusPill label="Pending" tone="pending" />;
  }

  async function handleDecision(
    requestId: string,
    decision: "approve" | "reject"
  ) {
    setBusyId(requestId);

    const result =
      decision === "approve"
        ? await services.requests.approveRequest(requestId)
        : await services.requests.rejectRequest(requestId);

    startTransition(() => {
      setInbox(result.inbox);
      setDashboard(result.dashboard);
      setBusyId(null);
    });
  }

  return (
    <div className="page-stack">
      <section className="hero-card hero-card--compact">
        <div>
          <p className="hero-card__eyebrow">Pending Booking Requests</p>
          <h1>Decision queue with live dashboard feedback.</h1>
          <p className="hero-card__copy">
            Approve or decline requests here. The booking feed, pending metrics, and
            facility pressure update immediately because both pages read from the same
            mock store contract.
          </p>
        </div>
        <div className="hero-card__mini-metrics">
          <article>
            <span>Pending queue</span>
            <strong>{inbox.summary.totalPending}</strong>
          </article>
          <article>
            <span>Urgent</span>
            <strong>{inbox.summary.highPriority}</strong>
          </article>
          <article>
            <span>Avg group</span>
            <strong>{inbox.summary.averageHeadcount}</strong>
          </article>
        </div>
      </section>

      <div className="split-layout">
        <SectionCard title="Approval Queue">
          <div className="request-grid">
            {visibleRequests.map((request) => (
              <article className="request-card" key={request.id}>
                <div className="request-card__top">
                  <div className="booking-cell">
                    <span className="facility-icon facility-icon--soft">
                      <Icon height={18} name={request.facilityIcon} width={18} />
                    </span>
                    <div className="request-card__identity">
                      <strong>{request.facilityName}</strong>
                      <p>
                        {request.requesterName} · {request.companyName}
                      </p>
                    </div>
                  </div>
                  <StatusPill
                    label={request.priority}
                    tone={request.priority}
                  />
                </div>

                <div className="request-card__facts">
                  <article className="request-fact">
                    <span>Requested slot</span>
                    <strong>{request.dateLabel}</strong>
                  </article>
                  <article className="request-fact">
                    <span>Headcount</span>
                    <strong>{request.headcount} pax</strong>
                  </article>
                  <article className="request-fact">
                    <span>Submitted</span>
                    <strong>{request.submittedAt}</strong>
                  </article>
                </div>

                <p className="request-card__note">{request.note}</p>

                <div className="request-card__actions">
                  <Button
                    disabled={busyId === request.id}
                    onClick={() => handleDecision(request.id, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    disabled={busyId === request.id}
                    onClick={() => handleDecision(request.id, "reject")}
                    variant="danger"
                  >
                    Decline
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {!visibleRequests.length ? (
            <div className="empty-panel">No requests match the current search.</div>
          ) : null}
        </SectionCard>

        <SectionCard title="Recently Resolved">
          <div className="resolved-list">
            {visibleResolvedRequests.map((request) => (
              <article className="resolved-card" key={request.id}>
                <div className="resolved-card__identity">
                  <div className="booking-cell booking-cell--compact">
                    <span className="facility-icon facility-icon--soft">
                      <Icon height={18} name={request.facilityIcon} width={18} />
                    </span>
                    <div>
                      <strong>{request.facilityName}</strong>
                      <p>{request.submittedAt}</p>
                    </div>
                  </div>
                </div>
                <div className="resolved-card__status">
                  {renderResolutionStatus(request.status)}
                </div>
              </article>
            ))}
          </div>

          {!visibleResolvedRequests.length ? (
            <div className="empty-panel">
              Resolved requests will appear here after approval or decline.
            </div>
          ) : null}
        </SectionCard>

        <div className="sidebar-stack">
          <SectionCard title="Decision Snapshot">
            <div className="snapshot-card">
              <article>
                <span>Next SLA</span>
                <strong>{inbox.summary.nextDecisionWindow}</strong>
              </article>
              <article>
                <span>Dashboard pending</span>
                <strong>
                  {
                    dashboard.metrics.find((metric) => metric.id === "pending-requests")
                      ?.value
                  }
                </strong>
              </article>
              <article>
                <span>Registered users</span>
                <strong>
                  {
                    dashboard.metrics.find((metric) => metric.id === "registered-users")
                      ?.value
                  }
                </strong>
              </article>
            </div>
          </SectionCard>

          <SectionCard title="Resolution Notes">
            <ul className="notes-list">
              <li>High-priority requests should be resolved first to preserve VIP experience.</li>
              <li>Approvals create a new booking entry and nudge weekly facility pressure.</li>
              <li>Declines clear the queue without inflating booking volume.</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
