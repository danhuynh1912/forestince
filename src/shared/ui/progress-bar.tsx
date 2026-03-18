export function ProgressBar({
  label,
  value,
  subtitle
}: {
  label: string;
  value: number;
  subtitle?: string;
}) {
  return (
    <article className="progress-stat">
      <div className="progress-stat__header">
        <div>
          <p>{label}</p>
          {subtitle ? <span>{subtitle}</span> : null}
        </div>
        <strong>{Math.round(value)}%</strong>
      </div>
      <div className="progress-stat__track">
        <span className="progress-stat__fill" style={{ width: `${value}%` }} />
      </div>
    </article>
  );
}
