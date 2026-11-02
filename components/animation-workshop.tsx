"use client";

import {
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpRight,
  Check,
  Minus,
  MousePointer2,
  Plus,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { PlayingCard, type PowerId } from "@/components/playing-card";

const powerCards: {
  id: string;
  title: string;
  subtitle: string;
  theme: "green" | "violet" | "sand";
  powerIds: PowerId[];
}[] = [
  { id: "c42", title: "Gardien solaire", subtitle: "Sentinelle · Feu", theme: "green", powerIds: ["p1", "p2"] },
  { id: "c67", title: "Oracle des marées", subtitle: "Mystique · Eau", theme: "violet", powerIds: ["p2", "p3"] },
  { id: "c33", title: "Messager céleste", subtitle: "Éclaireur · Air", theme: "sand", powerIds: ["p1", "p3"] },
];

const powerNames: Record<PowerId, string> = {
  p1: "Flamme",
  p2: "Vague",
  p3: "Éclair",
};

type TargetingStrategy = "composed-id" | "within-card";

export function AnimationWorkshop() {
  const [handVisible, setHandVisible] = useState(false);
  const [handDiscarded, setHandDiscarded] = useState(false);
  const [attackingSide, setAttackingSide] = useState<"player" | "opponent" | null>(null);
  const attackFrame = useRef<number | null>(null);
  const [mana, setMana] = useState(3);
  const [selectedCard, setSelectedCard] = useState(powerCards[0].id);
  const [selectedPower, setSelectedPower] = useState<PowerId>("p1");
  const [targetingStrategy, setTargetingStrategy] = useState<TargetingStrategy>("composed-id");
  const [powerFeedback, setPowerFeedback] = useState("");

  const chosenCard = powerCards.find((card) => card.id === selectedCard) ?? powerCards[0];
  const powerIsAvailable = chosenCard.powerIds.includes(selectedPower);

  function replayAttack(side: "player" | "opponent") {
    setAttackingSide(null);
    if (attackFrame.current !== null) {
      cancelAnimationFrame(attackFrame.current);
    }
    attackFrame.current = requestAnimationFrame(() => setAttackingSide(side));
  }

  function selectCard(cardId: string) {
    const card = powerCards.find((candidate) => candidate.id === cardId);
    setSelectedCard(cardId);
    if (card && !card.powerIds.includes(selectedPower)) {
      setSelectedPower(card.powerIds[0]);
    }
    setPowerFeedback("");
  }

  function activatePower() {
    const cardElement = document.getElementById(selectedCard);
    const powerElement =
      targetingStrategy === "composed-id"
        ? document.getElementById(`${selectedCard}_${selectedPower}`)
        : cardElement?.querySelector<HTMLElement>(`[data-power-id="${selectedPower}"]`);

    if (!powerElement || !powerIsAvailable) {
      setPowerFeedback("Ce pouvoir n’est pas disponible sur cette carte.");
      return;
    }

    powerElement.classList.remove("power-active");
    requestAnimationFrame(() => powerElement.classList.add("power-active"));
    setPowerFeedback(`${powerNames[selectedPower]} activé sur ${selectedCard}.`);
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#accueil" aria-label="Atelier animé, accueil">
          <span className="wordmark-mark"><Sparkles size={17} /></span>
          Atelier animé
        </a>
        <a className="header-link" href="#exercices">Les exercices <ArrowDownRight size={15} /></a>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> LABORATOIRE CSS · 5 EXERCICES</span>
          <h1 aria-label="Donnez vie à vos cartes.">Donnez vie<br />à vos <em>cartes.</em></h1>
          <p>
            Un terrain de jeu pour découvrir les animations CSS en créant les
            mouvements d’un jeu de cartes. À vous de jouer, une étape à la fois.
          </p>
          <a className="hero-cta" href="#exercices">
            Explorer les exercices <ArrowDownRight size={16} />
          </a>
          <div className="hero-note">
            <span className="note-line" />
            <span>On anime avec CSS. JavaScript donne le signal.</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Illustration de cartes à jouer">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-spark hero-spark-one">✦</div>
          <div className="hero-spark hero-spark-two">✳</div>
          <div className="hero-card hero-card-back"><span>✦</span></div>
          <div className="hero-card hero-card-front">
            <span className="hero-card-index">01 / FEU</span>
            <span className="hero-card-sigil">✹</span>
            <span className="hero-card-caption">Un peu de magie<br />dans chaque mouvement.</span>
          </div>
          <span className="hero-art-caption">CARTE N° 042 · ÉDITION ANIMÉE</span>
        </div>
        <span className="hero-index">01 — 05</span>
      </section>

      <div className="principle-strip">
        <span className="principle-icon"><MousePointer2 size={17} /></span>
        <p><strong>Le principe :</strong> une classe CSS lance l’animation. JavaScript ne fait que l’ajouter ou la retirer.</p>
        <a href="#exercice-1">Voir en action <ArrowDownRight size={14} /></a>
      </div>

      <section className="exercises-section" id="exercices">
        <div className="section-heading">
          <div>
            <span className="eyebrow">À VOUS DE JOUER</span>
            <h2>Cinq gestes, cinq animations.</h2>
          </div>
          <p>Testez chaque interaction, observez le résultat, puis explorez les classes CSS qui le déclenchent.</p>
        </div>

        <div className="exercise-list">
          <article className="exercise-panel" id="exercice-1">
            <div className="exercise-copy">
              <ExerciseNumber number="01" label="APPARITION" />
              <h3>La main se révèle.</h3>
              <p>Faites entrer les cartes en douceur : leur opacité passe de 0 à 1 en une demi-seconde.</p>
              <p className="learning-note"><span>À observer</span> L’état de départ, la classe ajoutée et la durée de l’animation.</p>
              <button className="button-primary" onClick={() => setHandVisible(true)} disabled={handVisible}>
                <Sparkles size={16} /> Piocher les cartes
              </button>
              {handVisible && (
                <button className="button-quiet" onClick={() => setHandVisible(false)}>
                  <RotateCcw size={14} /> Recommencer
                </button>
              )}
            </div>
            <div className="demo-stage hand-stage" aria-label="Démonstration de l’apparition des cartes">
              <div className="stage-label"><span>VOTRE MAIN</span><span>3 CARTES</span></div>
              <div className="card-row">
                <PlayingCard id="hand-ember" title="Braise vive" subtitle="Élémentaire · Feu" theme="coral" className={handVisible ? "draw-enter" : "draw-hidden"} />
                <PlayingCard id="hand-tide" title="Gardien des eaux" subtitle="Protecteur · Eau" theme="blue" className={handVisible ? "draw-enter draw-delay-1" : "draw-hidden"} />
                <PlayingCard id="hand-bloom" title="Lueur sauvage" subtitle="Esprit · Nature" theme="green" className={handVisible ? "draw-enter draw-delay-2" : "draw-hidden"} />
              </div>
              <span className="stage-caption">{handVisible ? "La main est prête." : "Cliquez sur « Piocher les cartes » pour commencer."}</span>
            </div>
          </article>

          <article className="exercise-panel" id="exercice-2">
            <div className="exercise-copy">
              <ExerciseNumber number="02" label="DISPARITION" />
              <h3>On vide la main.</h3>
              <p>Défaussez les cartes avec une transition d’opacité de 1 à 0, toujours en 0,5 seconde.</p>
              <p className="learning-note"><span>À observer</span> Les cartes restent dans le DOM : seule leur apparence change.</p>
              <button className="button-primary" onClick={() => setHandDiscarded(true)} disabled={handDiscarded}>
                <ArrowDownRight size={16} /> Défausser les cartes
              </button>
              {handDiscarded && (
                <button className="button-quiet" onClick={() => setHandDiscarded(false)}>
                  <RotateCcw size={14} /> Recommencer
                </button>
              )}
            </div>
            <div className="demo-stage" aria-label="Démonstration de la disparition des cartes">
              <div className="stage-label"><span>FIN DE TOUR</span><span>{handDiscarded ? "MAIN VIDE" : "3 CARTES"}</span></div>
              <div className="card-row">
                <PlayingCard id="discard-flare" title="Éclat ardent" subtitle="Élémentaire · Feu" theme="coral" className={handDiscarded ? "discard-exit" : ""} />
                <PlayingCard id="discard-mist" title="Brume paisible" subtitle="Mystique · Eau" theme="blue" className={handDiscarded ? "discard-exit discard-delay-1" : ""} />
                <PlayingCard id="discard-leaf" title="Veilleur des bois" subtitle="Esprit · Nature" theme="green" className={handDiscarded ? "discard-exit discard-delay-2" : ""} />
              </div>
              <span className="stage-caption">{handDiscarded ? "La main est vide. À vous de la remplir à nouveau." : "Prêts pour la défausse."}</span>
            </div>
          </article>

          <article className="exercise-panel" id="exercice-3">
            <div className="exercise-copy">
              <ExerciseNumber number="03" label="ATTAQUE" />
              <h3>À l’assaut !</h3>
              <p>Une carte recule pour prendre son élan, puis fonce vers son adversaire. Testez les deux camps.</p>
              <p className="learning-note"><span>À observer</span> Deux animations miroir, déclenchées séparément par une classe.</p>
              <div className="button-pair">
                <button className="button-primary" onClick={() => replayAttack("player")}>
                  <ArrowUpRight size={16} /> Votre attaque
                </button>
                <button className="button-outline" onClick={() => replayAttack("opponent")}>
                  <ArrowDownRight size={16} /> Riposte
                </button>
              </div>
            </div>
            <div className="demo-stage battle-stage" aria-label="Démonstration d’attaque entre deux cartes">
              <div className="stage-label"><span>DUEL</span><span><span className="battle-dot" /> À VOUS DE CHOISIR</span></div>
              <div className="battle-line"><span>JOUEUR</span><ArrowLeftRight size={15} /><span>ADVERSAIRE</span></div>
              <div className="card-row battle-cards">
                <PlayingCard id="battle-player" title="Chevalier solaire" subtitle="Votre carte" theme="coral" className={attackingSide === "player" ? "attack-right" : ""} />
                <PlayingCard id="battle-opponent" title="Oracle des ombres" subtitle="Carte adverse" theme="violet" className={attackingSide === "opponent" ? "attack-left" : ""} />
              </div>
              <span className="stage-caption">{attackingSide ? (attackingSide === "player" ? "Votre carte attaque !" : "L’adversaire attaque !") : "Les deux cartes se font face."}</span>
            </div>
          </article>

          <article className="exercise-panel" id="exercice-4">
            <div className="exercise-copy">
              <ExerciseNumber number="04" label="MANA DISPONIBLE" />
              <h3>Le bon coût, le bon moment.</h3>
              <p>Modifiez votre réserve de mana. Les cartes accessibles s’illuminent dès que vous avez assez de ressources.</p>
              <p className="learning-note"><span>À observer</span> Un changement de budget met à jour l’état de chaque carte.</p>
              <div className="mana-control">
                <span className="control-label">VOTRE RÉSERVE</span>
                <div className="mana-stepper">
                  <button className="stepper-button" onClick={() => setMana((value) => Math.max(0, value - 1))} disabled={mana === 0} aria-label="Retirer un mana">
                    <Minus size={16} />
                  </button>
                  <span className="mana-total"><Zap size={17} /> {mana}<small>/ 6</small></span>
                  <button className="stepper-button" onClick={() => setMana((value) => Math.min(6, value + 1))} disabled={mana === 6} aria-label="Ajouter un mana">
                    <Plus size={16} />
                  </button>
                </div>
                <input
                  aria-label="Réserve de mana"
                  className="mana-slider"
                  max={6}
                  min={0}
                  onChange={(event) => setMana(Number(event.target.value))}
                  type="range"
                  value={mana}
                />
              </div>
            </div>
            <div className="demo-stage mana-stage" aria-label={`Cartes jouables avec ${mana} manas`}>
              <div className="stage-label"><span>COÛT DES CARTES</span><span>RÉSERVE : {mana} MANA{mana > 1 ? "S" : ""}</span></div>
              <div className="card-row">
                {[
                  { id: "mana-spark", title: "Étincelle", subtitle: "Élémentaire · Feu", theme: "coral" as const, cost: 1 },
                  { id: "mana-keeper", title: "Gardien ancien", subtitle: "Protecteur · Terre", theme: "green" as const, cost: 3 },
                  { id: "mana-oracle", title: "Oracle lunaire", subtitle: "Mystique · Air", theme: "violet" as const, cost: 5 },
                ].map((card) => (
                  <PlayingCard key={card.id} id={card.id} title={card.title} subtitle={card.subtitle} theme={card.theme} manaCost={card.cost} className={card.cost <= mana ? "mana-playable" : "mana-unavailable"} />
                ))}
              </div>
              <div className="mana-legend"><span><i className="legend-dot playable-dot" /> Jouable</span><span><i className="legend-dot unavailable-dot" /> Trop coûteuse</span></div>
            </div>
          </article>

          <article className="exercise-panel exercise-panel-last" id="exercice-5">
            <div className="exercise-copy">
              <ExerciseNumber number="05" label="POUVOIRS" />
              <h3>Visez juste.</h3>
              <p>Choisissez une carte et l’un de ses pouvoirs, puis activez-le. Le pouvoir s’éclaire et grandit en 0,8 seconde.</p>
              <p className="learning-note"><span>À observer</span> Comparez les deux stratégies de ciblage dans le menu.</p>
              <div className="power-controls">
                <label>
                  <span className="control-label">CARTE</span>
                  <select value={selectedCard} onChange={(event) => selectCard(event.target.value)}>
                    {powerCards.map((card) => <option key={card.id} value={card.id}>{card.id} · {card.title}</option>)}
                  </select>
                </label>
                <label>
                  <span className="control-label">POUVOIR</span>
                  <select value={selectedPower} onChange={(event) => { setSelectedPower(event.target.value as PowerId); setPowerFeedback(""); }}>
                    {(["p1", "p2", "p3"] as PowerId[]).map((power) => (
                      <option key={power} value={power} disabled={!chosenCard.powerIds.includes(power)}>{power} · {powerNames[power]}{chosenCard.powerIds.includes(power) ? "" : " (indisponible)"}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="control-label">STRATÉGIE DE CIBLAGE</span>
                  <select value={targetingStrategy} onChange={(event) => setTargetingStrategy(event.target.value as TargetingStrategy)}>
                    <option value="composed-id">ID composé · c67_p2</option>
                    <option value="within-card">Chercher dans la carte</option>
                  </select>
                </label>
              </div>
              <button className="button-primary" onClick={activatePower} disabled={!powerIsAvailable}>
                <Zap size={16} /> Tester le pouvoir
              </button>
              <p className={`power-feedback${powerFeedback ? " is-visible" : ""}`} aria-live="polite">
                {powerFeedback && <Check size={14} />} {powerFeedback || "Choisissez une carte et un pouvoir pour commencer."}
              </p>
            </div>
            <div className="demo-stage power-stage" aria-label="Démonstration des pouvoirs">
              <div className="stage-label"><span>LES CARTES</span><span>CHOISISSEZ VOTRE CIBLE</span></div>
              <div className="card-row power-cards">
                {powerCards.map((card) => (
                  <PlayingCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    subtitle={card.subtitle}
                    theme={card.theme}
                    powerIds={card.powerIds}
                    className={selectedCard === card.id ? "selected-card" : ""}
                  />
                ))}
              </div>
              <div className="power-key">
                <span><i className="power-key-dot" data-power="p1" /> p1 · Flamme</span>
                <span><i className="power-key-dot" data-power="p2" /> p2 · Vague</span>
                <span><i className="power-key-dot" data-power="p3" /> p3 · Éclair</span>
              </div>
              <span className="stage-caption">Chaque pouvoir a son propre identifiant et sa propre couleur.</span>
            </div>
          </article>
        </div>
      </section>

      <section className="closing-note">
        <div className="closing-icon"><MousePointer2 size={21} /></div>
        <div>
          <span className="eyebrow">À RETENIR</span>
          <h2>Un clic, une classe, une animation.</h2>
          <p>Les transformations restent en CSS. Côté JavaScript, on choisit simplement quand démarrer ou réinitialiser l’effet.</p>
        </div>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#accueil"><span className="wordmark-mark"><Sparkles size={15} /></span> Atelier animé</a>
        <span>Un petit labo pour de grandes idées.</span>
        <a href="#exercices">Retour aux exercices <ArrowUpRight size={14} /></a>
      </footer>
    </main>
  );
}

function ExerciseNumber({ number, label }: { number: string; label: string }) {
  return (
    <div className="exercise-number">
      <span>{number}</span><i />{label}
    </div>
  );
}
