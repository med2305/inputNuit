import { useEffect, useRef, useState } from "react";
import { Fish } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn as classNames } from "@/lib/utils";

interface FloatingInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  position: { x: number; y: number };
  isSpinning: { isSpinning: boolean; intensity: number };
  placeholder?: string;
  completedRules: number[];
  totalRules: number;
  currentRule?: {
    message: string;
    hint: string;
    id?: number;
  };
}

// Animations par règle
const RULE_ANIMATIONS = {
  1: "super-nervous", // Super nerveux
  2: "animate-shake-extreme", // Tremblement extrême
  3: "animate-spin-crazy", // Rotation folle
  4: "animate-bounce-wild", // Rebonds sauvages
  5: "animate-zigzag", // Zigzag rapide
  6: "animate-teleport", // Téléportation
  7: "animate-glitch", // Effet glitch
  8: "animate-earthquake", // Tremblement de terre
  9: "animate-tornado", // Effet tornade
  10: "animate-chaos" // Chaos total
};

export function FloatingInput({ 
  value,
  onChange,
  position,
  isSpinning,
  placeholder = "",
  completedRules,
  totalRules,
  currentRule
}: FloatingInputProps) {
  const [showHelp, setShowHelp] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState("");
  const [intensity, setIntensity] = useState(1);

  // Effet pour augmenter l'intensité avec chaque règle complétée
  useEffect(() => {
    setIntensity(1 + (completedRules.length * 0.5));
  }, [completedRules.length]);

  // Effet pour changer l'animation quand une nouvelle règle est complétée
  useEffect(() => {
    if (currentRule?.id && RULE_ANIMATIONS[currentRule.id as keyof typeof RULE_ANIMATIONS]) {
      setCurrentAnimation(RULE_ANIMATIONS[currentRule.id as keyof typeof RULE_ANIMATIONS]);
    }
  }, [currentRule?.id]);

  // Effet pour les comportements nerveux
  useEffect(() => {
    if (!value) return;

    const moveInterval = setInterval(() => {
      if (Math.random() < 0.6) {
        const container = containerRef.current?.getBoundingClientRect();
        if (!container) return;
        
        const jumpDistance = 200 * intensity;
        const currentX = inputPosition.x;
        const currentY = inputPosition.y;
        
        let newX = currentX + (Math.random() - 0.5) * jumpDistance;
        let newY = currentY + (Math.random() - 0.5) * jumpDistance;
        
        const maxX = window.innerWidth - container.width;
        const maxY = window.innerHeight - container.height;
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        setInputPosition({ x: newX, y: newY });
      }
    }, Math.max(200, 1000 - (completedRules.length * 100))); // Devient plus rapide avec chaque règle

    const blinkInterval = setInterval(() => {
      if (Math.random() < 0.4 * intensity) {
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), Math.max(50, 100 - (completedRules.length * 10)));
      }
    }, Math.max(300, 800 - (completedRules.length * 50)));

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const container = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const detectionRadius = 200 + (completedRules.length * 20);
      
      if (
        mouseX > container.left - detectionRadius && 
        mouseX < container.right + detectionRadius &&
        mouseY > container.top - detectionRadius && 
        mouseY < container.bottom + detectionRadius
      ) {
        const deltaX = (container.left + container.width / 2) - mouseX;
        const deltaY = (container.top + container.height / 2) - mouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < detectionRadius) {
          const intensity = (detectionRadius - distance) / detectionRadius;
          const moveX = (deltaX / distance) * 300 * intensity * intensity;
          const moveY = (deltaY / distance) * 300 * intensity * intensity;
          
          setInputPosition(prev => {
            let newX = prev.x + moveX;
            let newY = prev.y + moveY;
            
            newX += (Math.random() - 0.5) * 50 * intensity;
            newY += (Math.random() - 0.5) * 50 * intensity;
            
            const maxX = window.innerWidth - container.width;
            const maxY = window.innerHeight - container.height;
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            
            return { x: newX, y: newY };
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(moveInterval);
      clearInterval(blinkInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [value, inputPosition, intensity]);

  return (
    <TooltipProvider>
      <div 
        ref={containerRef}
        className={classNames(
          "fixed transition-all duration-200 ease-out",
          currentAnimation,
          completedRules.length > 0 && "animate-nervous"
        )}
        style={{
          transform: `translate(${inputPosition.x}px, ${inputPosition.y}px)`,
          opacity: isVisible ? 1 : 0,
          zIndex: 50,
          '--intensity': intensity
        } as React.CSSProperties}
      >
        <div className="relative w-full max-w-sm">
          {/* Zone de saisie */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Entrer votre nom"
              className={classNames(
                "relative w-full rounded-full border-2 bg-white/80 px-4 py-2 text-lg shadow-lg backdrop-blur-sm transition-all text-center",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "placeholder:text-gray-400/70 placeholder:text-center placeholder:transition-none",
                !value && "hover:placeholder:text-gray-500/80",
                completedRules.length === totalRules ? "border-green-500" : 
                completedRules.length > 0 ? "border-blue-500" : "border-gray-300",
                currentAnimation
              )}
            />
          </div>

          {/* Affichage des règles */}
          {currentRule && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md" style={{ zIndex: 40 }}>
              <div 
                className={classNames(
                  "p-4 rounded-lg backdrop-blur-sm transition-all duration-300 transform",
                  "animate-float shadow-lg",
                  completedRules.includes(currentRule.id || 0)
                    ? "bg-green-500/20 text-green-700 border-2 border-green-500/50"
                    : "bg-blue-500/20 text-blue-700 border-2 border-blue-500/50",
                  "hover:scale-105"
                )}
                style={{ maxWidth: "calc(100vw - 2rem)" }}
              >
                <div className="relative">
                  {/* Bulles d'eau */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-500/20 animate-bubble" />
                      <div className="absolute -top-1 left-2 w-3 h-3 rounded-full bg-blue-500/30 animate-bubble delay-100" />
                      <div className="absolute top-0 -right-1 w-2 h-2 rounded-full bg-blue-500/40 animate-bubble delay-200" />
                    </div>
                  </div>

                  {/* Contenu de la règle */}
                  <div className="text-center">
                    <p className="text-lg font-medium mb-1">
                      {currentRule.message}
                    </p>
                    <p className="text-sm opacity-75">
                      {currentRule.hint}
                    </p>
                  </div>

                  {/* Vagues en bas */}
                  <div className="absolute -bottom-4 w-full overflow-hidden h-2">
                    <div className="w-full h-full bg-current/20 animate-wave" />
                    <div className="w-full h-full bg-current/10 animate-wave-reverse" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Indicateur de poisson */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Fish className="text-blue-500 animate-swim" size={24} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}