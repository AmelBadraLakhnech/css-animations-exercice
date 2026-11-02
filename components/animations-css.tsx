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
  const [selectedCard, setSelectedCard] = useState(powerCards[0].id);
  const [selectedPower, setSelectedPower] = useState<PowerId>("p1");
  
  const chosenCard = powerCards.find((card) => card.id === selectedCard) ?? powerCards[0];
  
  const firstCardId = "card1";

  async function afficherCarte(visible: boolean) {
    // TODO: Début
    // On utilise la fonction setCardVisible pour mettre à jour l'état de visibilité de la carte.
    if(visible) {
      setCardVisible(true);
      // La classe "fade-in" est appliquée automatiquement via le rendu conditionnel dans le JSX.
    }
    else {
      const cardElement = document.getElementById(firstCardId);

      cardElement!.classList.add("fade-out");

      // On attend 500ms pour que l'animation de disparition se termine avant de mettre à jour l'état.
      await new Promise(resolve => setTimeout(resolve, 500));
      setCardVisible(visible);
    }
    // TODO: Fin
  }

  const attackingCardsIds = ["playerCardId", "opponentCardId"];

  async function jouerAttaque(side: "player" | "opponent") {
    // TODO: Début
    
    const cardElement = document.getElementById(`${side}CardId`);
    if (cardElement) {
      let animationClass = `${side}-attack`;
      cardElement.classList.remove(animationClass);
      void cardElement.offsetWidth; // Forcer un reflow
      cardElement.classList.add(animationClass);
    }
    // TODO: Fin
  }
  
  function activatePower() {
    // Début TODO
    const powerElement = document.getElementById(`${selectedCard}_${selectedPower}`);

    if (!powerElement) {
      return;
    }

    powerElement.classList.remove("power-active");
    void powerElement.offsetWidth; // Forcer un reflow
    powerElement.classList.add("power-active");
    // Fin TODO
  }

  function selectCard(cardId: string) {
    const card = powerCards.find((candidate) => candidate.id === cardId);
    setSelectedCard(cardId);
    if (card && !card.powerIds.includes(selectedPower)) {
      setSelectedPower(card.powerIds[0]);
    }
  }

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
                {cardVisible && <PlayingCard id={firstCardId} className="fade-in"/>}
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
                  <PlayingCard key={card.id} id={card.id} manaCost={card.cost} className={card.cost <= mana ? "card-can-be-played" : ""}/>
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
                  <select value={selectedCard} onChange={(event) => selectCard(event.target.value)}>
                    {powerCards.map((card) => <option key={card.id} value={card.id}>{card.id}</option>)}
                  </select>
                </label>
                <label>
                  <span className="control-label">POUVOIR</span>
                  <select value={selectedPower} onChange={(event) => { setSelectedPower(event.target.value as PowerId); }}>
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
                    className={selectedCard === card.id ? "selected-card" : ""}
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

