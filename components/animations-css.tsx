"use client";

import {
  ArrowDownRight,
  ArrowLeftRight,
  ArrowUpRight,
  Minus,
  Plus,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { PlayingCard, type PowerId } from "@/components/playing-card";
import "@/components/animations.css";

export function AnimationsCSS() {
  const powerIds: PowerId[] = [
    "p1",
    "p2",
    "p3",
  ];

  const powerCards: {
    id: string;
    powerIds: PowerId[];
  }[] = [
    { id: "c42", powerIds: ["p1", "p2"] },
    { id: "c67", powerIds: ["p2", "p3"] },
    { id: "c33", powerIds: ["p1", "p3"] },
  ];

  const costCards = [
    { id: "cost1", cost: 1 },
    { id: "cost3", cost: 3 },
    { id: "cost5", cost: 5 },
  ];

  const [cardVisible, setCardVisible] = useState(false);
  const [mana, setMana] = useState(3);
  const [selectedCardId, setSelectedCardId] = useState(powerCards[0].id);
  const [selectedPowerId, setSelectedPowerId] = useState<PowerId>("p1");
  // Nombre de cartes pigées après la première (0, 1 ou 2).
  const [drawnCount, setDrawnCount] = useState(0);
  // Pige simple : false = la carte est face cachée dans le paquet, true = elle a été pigée.
  const [simpleDrawn, setSimpleDrawn] = useState(false);
  // Les cartes de la pige : c42 est déjà visible, les deux autres sont dans le paquet.
  const drawCards = powerCards;
  // On affiche la plus récente à gauche : c'est elle qui prend la place de la carte visible.
  const visibleDrawCards = drawCards.slice(0, drawnCount + 1).reverse();

  const firstCardId = "card1";

  async function afficherCarte(visible: boolean) {
    // TODO Afficher: Pour afficher rien de spécial à faire, mais assurez-vous que la classe "fade-in" est appliquée à la carte.
    // Regardez plus bas pour utiliser la propriété className directement sur l'élément!
    
    // TODO: Cacher: Pour cacher, il faut d'abord ajouter la classe "fade-out" à la carte, puis attendre 500ms pour que l'animation se termine avant de mettre à jour l'état
    
    setCardVisible(visible);
  }

  const attackingCardsIds = ["playerCardId", "opponentCardId"];

  async function jouerAttaque(side: "player" | "opponent") {
    // TODO: Il faut obtenir l'élément du DOM correspondant à la carte du côté spécifié 
    // Les ids utilisés sont dans l'array attackingCardsIds juste au-dessus de cette fonction.
    // Il y a deux animations possibles : "player-attack" et "opponent-attack"
  }
  
  function activatePower() {
    // TODO: Il faut obtenir l'élément du DOM correspondant à la carte et au pouvoir sélectionnés
    // puis lui appliquer la classe "power-active" pour déclencher l'animation.
  }

  // Il y a peu de choses à faire dans le reste du code, il y a 2 TODOs à compléter
  return (
    <main>
      <section className="exercises-section" id="exercices">
        <div className="exercise-list">
          <article className="exercise-panel" id="exercice-1">
            <div className="exercise-copy">
              <h3>Faire apparaître et disparaître une carte</h3>
              <p>Faites entrer les cartes en faisant passer leur opacité de 0 à 1 en une demi-seconde.</p>
              <div className="button-pair">
                <button className="button-primary" onClick={() => afficherCarte(true)} disabled={cardVisible}>
                    Montrer la carte
                </button>

                <button className="button-primary" onClick={() => afficherCarte(false)} disabled={!cardVisible}>
                  Cacher la carte
                </button>
              </div>
              
            </div>
            <div className="demo-stage hand-stage" aria-label="Démonstration de l’apparition des cartes">
              <div className="card-row">
                {cardVisible && <PlayingCard id={firstCardId} /* TODO: On peut mettre la classe d'animation fade-in ici, comme ça l'objet l'a dès qu'il existe*//>}
              </div>
            </div>
          </article>

          <article className="exercise-panel" id="exercice-3">
            <div className="exercise-copy">
              <h3>Attaque!</h3>
              <p>Une carte recule pour prendre son élan, puis avance vers son adversaire. Testez les deux côtés.</p>
              <div className="button-pair">
                <button className="button-primary" onClick={() => jouerAttaque("player")}>
                  <ArrowUpRight size={16} /> Votre attaque
                </button>
                <button className="button-outline" onClick={() => jouerAttaque("opponent")}>
                  <ArrowDownRight size={16} /> Riposte
                </button>
              </div>
            </div>
            <div className="demo-stage battle-stage" aria-label="Démonstration d’attaque entre deux cartes">
              <div className="battle-line"><span>JOUEUR</span><ArrowLeftRight size={15} /><span>ADVERSAIRE</span></div>
              <div className="card-row battle-cards">
                {attackingCardsIds.map((cardId) => (
                  <PlayingCard key={cardId} id={cardId}/>
                ))}
              </div>
            </div>
          </article>

          <article className="exercise-panel" id="exercice-4">
            <div className="exercise-copy">
              <h3>Le bon coût, le bon moment.</h3>
              <p>Modifiez votre budget de mana. Les cartes jouables s’illuminent dès que vous en avez assez.</p>
              <div className="mana-control">
                <div className="mana-stepper">
                  <button className="stepper-button" onClick={() => setMana(Math.max(0, mana - 1))} disabled={mana === 0} aria-label="Retirer un mana">
                    <Minus size={16} />
                  </button>
                  <span className="mana-total"><Zap size={17} /> {mana}<small>/ 6</small></span>
                  <button className="stepper-button" onClick={() => setMana(Math.min(6, mana + 1))} disabled={mana === 6} aria-label="Ajouter un mana">
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
              <div className="card-row">
                {costCards.map((card) => (
                  <PlayingCard key={card.id} id={card.id} manaCost={card.cost} /*TODO ajouter le className pour jouer l'animation *//>
                ))}
              </div>
            </div>
          </article>

          <article className="exercise-panel exercise-panel-last" id="exercice-5">
            <div className="exercise-copy">
              <h3>Activer les pouvoirs</h3>
              <p>Choisissez une carte et l’un de ses pouvoirs, puis activez-le. Le pouvoir s’éclaire et grandit en 0,8 seconde.</p>
              <div className="power-controls">
                <label>
                  <span className="control-label">CARTE</span>
                  <select value={selectedCardId} onChange={(event) => setSelectedCardId(event.target.value)}>
                    {powerCards.map((card) => <option key={card.id} value={card.id}>{card.id}</option>)}
                  </select>
                </label>
                <label>
                  <span className="control-label">POUVOIR</span>
                  <select value={selectedPowerId} onChange={(event) => { setSelectedPowerId(event.target.value as PowerId); }}>
                    {powerIds.map((power) => (
                      <option key={power} value={power}>{power}</option>
                    ))}
                  </select>
                </label>
              </div>
              <button className="button-primary" onClick={activatePower}>
                Tester le pouvoir
              </button>
            </div>
            <div className="demo-stage power-stage" aria-label="Démonstration des pouvoirs">
              <div className="card-row power-cards">
                {powerCards.map((card) => (
                  <PlayingCard
                    key={card.id}
                    id={card.id}
                    powerIds={card.powerIds}
                    className={selectedCardId === card.id ? "selected-card" : ""}
                  />
                ))}
              </div>
            </div>
          </article>

          {/* Exercice de la pige SIMPLE */}
          <article className="exercise-panel" id="exercice-6">
            <div className="exercise-copy">
              <h3>Piger une carte (simple)</h3>
              <p>Une carte face cachée attend dans le paquet. Elle se retourne, grandit et monte à sa place.</p>
              <div className="button-pair">
                <button className="button-primary" onClick={() => setSimpleDrawn(true)} disabled={simpleDrawn}>
                  Piger
                </button>
                <button className="button-outline" onClick={() => setSimpleDrawn(false)}>
                  Réinitialiser
                </button>
              </div>
            </div>
            <div className="demo-stage draw-stage" aria-label="Démonstration simple de la pige d’une carte">
              <div className="card-row">
                {simpleDrawn && (
                  <PlayingCard
                    id="simple_c42"
                    powerIds={powerCards[0].powerIds}
                    // TODO: Ajouter la classe d'animation pour que la carte se retourne
                  />
                )}
              </div>
              {!simpleDrawn && (
                <div className="card-row draw-deck">
                  <PlayingCard id="simple_deck" faceDown />
                </div>
              )}
            </div>
          </article>

          {/* Exercice de la pige COMPLEXE */}
          <article className="exercise-panel" id="exercice-7">
            <div className="exercise-copy">
              <h3>Piger une carte</h3>
              <p>La carte du paquet se retourne, grandit et monte prendre la place de la carte visible, qui se décale vers la droite.</p>
              <div className="button-pair">
                <button className="button-primary" onClick={() => setDrawnCount(drawnCount + 1)} disabled={drawnCount === 2}>
                  Piger
                </button>
                <button className="button-outline" onClick={() => setDrawnCount(0)}>
                  Réinitialiser
                </button>
              </div>
            </div>
            <div className="demo-stage draw-stage" aria-label="Démonstration de la pige d’une carte">
              <div className="card-row">
                {visibleDrawCards.map((card, index) => {
                  // Si aucune carte n'a été pigée, on affiche la carte normalement sans animation.
                  if(drawnCount === 0) {
                    return (
                      <PlayingCard
                        key={card.id}
                        id={`draw_${card.id}`}
                        powerIds={card.powerIds}
                      />
                    );
                  }
                  else{
                    // Si c'est la première carte pigée, on applique l'animation de flip.
                    if(index ===0){
                      return (
                        <PlayingCard
                          // La key change à chaque pige pour les anciennes cartes : l'animation recommence.
                          // Pas simple à comprendre, mais c'est pour que le système considère que c'est un nouvel élément du DOM et qu'il doit rejouer l'animation.
                          key={card.id}
                          id={`draw_${card.id}`}
                          powerIds={card.powerIds}
                          // TODO: Ajouter la classe d'animation pour que la carte se retourne
                        />
                      );
                    }
                    // Sinon, on applique l'animation de glissement vers la droite.
                    else{
                      return (
                        <PlayingCard
                          // La key change à chaque pige pour les anciennes cartes : l'animation recommence donc.
                          // Pas simple à comprendre, mais c'est pour que le système considère que c'est un nouvel élément du DOM et qu'il doit rejouer l'animation.
                          // Sinon on doit faire comme dans les autres exemples et retirer et ensuite ajouter la classe...
                          key={`${card.id}-${drawnCount}`}
                          id={`draw_${card.id}`}
                          powerIds={card.powerIds}
                          // TODO: Ajouter la classe d'animation pour que la carte se retourne déplace vers la droite
                        />
                      );
                    }
                  }
                  
                })}
              </div>
              {drawnCount < 2 && (
                <div className="card-row draw-deck">
                  <PlayingCard id="deck" faceDown />
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

