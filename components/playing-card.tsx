export type PowerId = "p1" | "p2" | "p3";

const powers: Record<PowerId, { color: string }> = {
  p1: { color: "coral" },
  p2: { color: "blue" },
  p3: { color: "gold" },
};

type PlayingCardProps = {
  id: string;
  manaCost?: number;
  powerIds?: PowerId[];
  className?: string;
  style?: React.CSSProperties;
  // Si true, la carte est affichée face cachée (on voit son dos).
  faceDown?: boolean;
};

export function PlayingCard({
  id,
  manaCost,
  powerIds = [],
  className = "",
  style,
  faceDown = false,
}: PlayingCardProps) {
  return (
    <article
      className={`playing-card ${faceDown ? "face-down" : ""} ${className}`}
      id={id}
      style={style}
      aria-label={`${manaCost === undefined ? "" : `, coût ${manaCost} manas`}`}
    >
      {/* Côté face : le contenu de la carte */}
      <div className="card-face card-front">
        <div className="card-heading">
          <div>
            <span className="card-id">{id}</span>
          </div>
          {manaCost !== undefined && (
            <span className="mana-gem" aria-label={`${manaCost} manas`}>
              {manaCost}
            </span>
          )}
        </div>

        <div className="card-footer">
          {powerIds.length > 0 && (
            <div className="power-list" aria-label="Pouvoirs">
              {powerIds.map((powerId) => (
                <span
                  className="power-token"
                  data-power-id={powerId}
                  // TODO: il faut rendre l'id unique! Présentement, si on a plusieurs cartes avec le même pouvoir, l'id sera dupliqué.
                  id={`${id}_${powerId}`}
                  key={powerId}
                  title={`${powerId}`}
                  aria-label={`${powerId}`}
                >
                  {powerId.slice(1)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Côté pile : le dos de la carte, tourné de 180deg dans le CSS */}
      <div className="card-face card-back-face" />
    </article>
  );
}
