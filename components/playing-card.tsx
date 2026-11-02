export type PowerId = "p1" | "p2" | "p3";

const powers: Record<PowerId, { label: string; color: string }> = {
  p1: { label: "Flamme", color: "coral" },
  p2: { label: "Vague", color: "blue" },
  p3: { label: "Éclair", color: "gold" },
};

type PlayingCardProps = {
  id: string;
  title: string;
  subtitle: string;
  theme: "coral" | "blue" | "green" | "violet" | "gold" | "sand";
  manaCost?: number;
  powerIds?: PowerId[];
  className?: string;
};

export function PlayingCard({
  id,
  title,
  subtitle,
  theme,
  manaCost,
  powerIds = [],
  className = "",
}: PlayingCardProps) {
  return (
    <article
      className={`playing-card ${className}`}
      data-theme={theme}
      id={id}
      aria-label={`${title}${manaCost === undefined ? "" : `, coût ${manaCost} manas`}`}
    >
      <div className="card-heading">
        <div>
          <span className="card-id">{id}</span>
          <h3>{title}</h3>
        </div>
        {manaCost !== undefined && (
          <span className="mana-gem" aria-label={`${manaCost} manas`}>
            {manaCost}
          </span>
        )}
      </div>
      <div className="card-art" aria-hidden="true">
        <span className="art-orbit art-orbit-one" />
        <span className="art-orbit art-orbit-two" />
        <span className="art-core" />
      </div>
      <div className="card-footer">
        <span>{subtitle}</span>
        {powerIds.length > 0 && (
          <div className="power-list" aria-label="Pouvoirs">
            {powerIds.map((powerId) => (
              <span
                className="power-token"
                data-power-id={powerId}
                id={`${id}_${powerId}`}
                key={powerId}
                title={`${powers[powerId].label} (${powerId})`}
                aria-label={`${powers[powerId].label}, ${powerId}`}
              >
                {powerId.slice(1)}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
