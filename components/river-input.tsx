"use client";

import { useState, useEffect } from "react";
import { useAudio } from "@/hooks/use-audio";
import { usePosition } from "@/hooks/use-position";
import { useWhirlpool } from "@/hooks/use-whirlpool";
import { FloatingInput } from "./river/floating-input";
import { FishSchool } from "./river/fish-school";
import { SuccessModal } from "./river/success-modal";
import classNames from "classnames";

// Liste des courants océaniques
const OCEAN_CURRENTS = [
  "Gulf Stream",
  "Kuroshio",
  "Humboldt",
  "Benguela",
  "Agulhas",
  "Labrador",
  "Oyashio",
  "Californie",
  "Mozambique",
  "Courant Circumpolaire Antarctique"
];

// Liste des espèces océaniques
const OCEAN_SPECIES = [
  "dauphin",
  "baleine",
  "requin",
  "poisson-clown",
  "tortue",
  "méduse",
  "corail",
  "pieuvre",
  "hippocampe",
  "raie",
  "phoque",
  "orque",
  "narval",
  "morse",
  "otarie"
];

const OCEAN_RULES = [
  {
    id: 1,
    check: (name: string) => name.length >= 5,
    message: "🌊 Commence le voyage !",
    hint: "Ton nom doit contenir au moins 5 caractères"
  },
  {
    id: 5,
    check: (name: string) => /\d/.test(name),
    message: "🔢 Identité numérique !",
    hint: "Votre nom doit inclure un chiffre."
  },
  {
    id: 9,
    check: (name: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(name),
    message: "🌟 Caractère unique !",
    hint: "Votre nom doit inclure un caractère spécial."
  },
  {
    id: 10,
    check: (name: string) => /[A-Z]/.test(name),
    message: "🏔️ Sommet de l'expression",
    hint: "Votre nom doit inclure au moins une lettre majuscule."
  },
  {
    id: 6,
    check: (name: string) => ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "décembre"].some(month => name.toLowerCase().includes(month)),
    message: "🗓️ Cycle des saisons !",
    hint: "Votre nom doit inclure le nom d'un mois."
  },
  {
    id: 8,
    check: (name: string) => ["rouge", "bleu", "vert", "jaune", "orange", "violet", "rose", "marron", "gris", "noir", "blanc", "beige", "turquoise", "indigo", "magenta", "cyan", "lavande", "corail", "bordeaux", "marine", "olive", "bronze", "argent", "or", "pourpre", "saumon"].some(color => name.toLowerCase().includes(color)),
    message: "🎨 Palette de couleurs !",
    hint: "Votre nom doit inclure le nom d'une couleur."
  },
  {
    id: 11,
    check: (name: string) => ["france", "allemagne", "italie", "espagne", "portugal", "royaume-uni", "irlande", "belgique", "pays-bas", "suisse", "autriche", "pologne", "république tchèque", "slovaquie", "hongrie", "roumanie", "bulgarie", "grèce", "chypre", "malte", "danemark", "suède", "norvège", "finlande", "islande", "estonie", "lettonie", "lituanie", "russie", "ukraine", "moldavie", "biélorussie", "serbie", "croatie", "slovénie", "bosnie", "monténégro", "albanie", "macédoine", "kosovo", "luxembourg"].some(country => name.toLowerCase().includes(country)),
    message: "🇪🇺 Voyage européen !",
    hint: "Votre nom doit inclure le nom d'un pays européen en français."
  },
  {
    id: 2,
    check: (name: string) => /H₂O|h2o|H2O/i.test(name),
    message: "💧 L'eau, source de vie !",
    hint: "Votre nom doit inclure la formule chimique de l'eau."
  },
  {
    id: 3,
    check: (name: string) => ["humboldt", "kuroshio", "antarctique","pacifique","benguela","agulhas","labrador","oyashio",].some(current => name.includes(current)),
    message: "💧 Courants océaniques !",
    hint: "Votre nom doit inclure le nom d'un courant océanique."
  },
  {
    id: 4,
    check: (name: string) => ["dauphin", "baleine", "requin", "orque", "tortue", "poisson", "corail"].some(species => name.toLowerCase().includes(species)),
    message: "Habitants de l'océan !",
    hint: "Votre nom doit inclure le nom d'une espèce marine."
  },
];

export function RiverInput() {
  const [value, setValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [fishActive, setFishActive] = useState(false);
  const [completedRules, setCompletedRules] = useState<number[]>([]);
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const position = usePosition();
  const whirlpool = useWhirlpool();
  const { playSuccessSound } = useAudio();

  // Vérifier les règles à chaque changement
  useEffect(() => {
    if (!value) {
      setShowRules(false);
      setCompletedRules([]);
      setCurrentRuleIndex(0);
      return;
    }

    // Activer l'affichage des règles après la première saisie
    if (!showRules && value.length > 0) {
      setShowRules(true);
    }

    const newCompletedRules: number[] = [];
    let firstIncompleteRuleIndex = 0;

    // Vérifier chaque règle dans l'ordre
    for (let i = 0; i < OCEAN_RULES.length; i++) {
      const rule = OCEAN_RULES[i];
      if (rule.check(value)) {
        if (!completedRules.includes(rule.id)) {
          playSuccessSound();
        }
        newCompletedRules.push(rule.id);
      } else {
        firstIncompleteRuleIndex = i;
        break;
      }
    }

    setCompletedRules(newCompletedRules);
    setCurrentRuleIndex(firstIncompleteRuleIndex);

    // Vérifier si toutes les règles sont complétées
    if (newCompletedRules.length === OCEAN_RULES.length && !isComplete) {
      setIsComplete(true);
      playSuccessSound();
    }
  }, [value, completedRules, isComplete, showRules]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const currentRule = OCEAN_RULES[currentRuleIndex];

  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <div className="relative w-full max-w-sm px-4">


        {/* Zone de saisie */}
        <div className="relative">
          <FloatingInput
            value={value}
            onChange={handleInputChange}
            position={position}
            isSpinning={{ isSpinning: false, intensity: 0 }}
            placeholder="Entrer votre nom"
            completedRules={completedRules}
            totalRules={OCEAN_RULES.length}
            currentRule={{
              ...currentRule,
              id: currentRuleIndex + 1
            }}
          />
        </div>
        
        {/* Espace explicite entre l'input et les règles */}
        <div className="my-4"></div>

       
        
        <FishSchool isActive={fishActive} letterCount={value.length} />
      </div>

      <SuccessModal isOpen={isComplete} />
    </div>
  );
}