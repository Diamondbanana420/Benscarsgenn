import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  SiNetflix,
  SiSpotify,
  SiSteam,
  SiApple,
  SiGoogleplay,
  SiUbereats,
} from "react-icons/si";
import {
  AmazonLogo,
  ColesLogo,
  WoolworthsLogo,
  SevenElevenLogo,
  SheinLogo,
  CottonOnLogo,
  ForeverNewLogo,
} from "@/components/BrandLogos";

const BRAND_ICONS = {
  amazon: AmazonLogo,
  netflix: SiNetflix,
  spotify: SiSpotify,
  steam: SiSteam,
  apple: SiApple,
  google_play: SiGoogleplay,
  uber_eats: SiUbereats,
  coles: ColesLogo,
  woolworths: WoolworthsLogo,
  seven_eleven: SevenElevenLogo,
  shein: SheinLogo,
  cotton_on: CottonOnLogo,
  forever_new: ForeverNewLogo,
};

const BRAND_COLORS = {
  amazon: "#FF9900",
  netflix: "#E50914",
  spotify: "#1DB954",
  steam: "#171A21",
  apple: "#000000",
  google_play: "#34A853",
  uber_eats: "#06C167",
  coles: "#E01A22",
  woolworths: "#125F2A",
  seven_eleven: "#F47321",
  shein: "#000000",
  cotton_on: "#1A1A1A",
  forever_new: "#C8A96E",
};

export default function BrandCard({ brand, code, isLoading, onGenerate }) {
  const [copied, setCopied] = useState(false);
  const [codeKey, setCodeKey] = useState(0);

  const Icon = BRAND_ICONS[brand.id];
  const brandColor = BRAND_COLORS[brand.id];

  const handleGenerate = () => {
    onGenerate();
    setCodeKey((k) => k + 1);
  };

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!", {
        description: `${brand.name} gift card code copied.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div
      className="brand-card relative flex flex-col bg-white border border-zinc-200 rounded-xl p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group"
      style={{ "--brand-color": brandColor }}
      data-testid={`brand-card-${brand.id}`}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: brandColor }}
      />

      <div className="flex flex-col gap-6 h-full justify-between">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 rounded-lg flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: `${brandColor}12`, color: brandColor }}
          >
            {Icon && <Icon size={22} />}
          </div>
          <div>
            <h3
              className="text-lg font-semibold tracking-tight text-zinc-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {brand.name}
            </h3>
            <p
              className="text-xs text-zinc-400"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {brand.format}
            </p>
          </div>
        </div>

        {/* Code Display */}
        <div className="relative min-h-[60px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={code ? `${code}-${codeKey}` : "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {code ? (
                <div
                  className="text-lg md:text-xl tracking-[0.2em] text-zinc-950 bg-zinc-100 py-3 px-4 rounded-md text-center w-full break-all select-all"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  data-testid={`code-display-${brand.id}`}
                >
                  {code}
                </div>
              ) : (
                <div
                  className="text-sm text-zinc-300 bg-zinc-50 py-3 px-4 rounded-md text-center w-full border border-dashed border-zinc-200"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                  data-testid={`code-placeholder-${brand.id}`}
                >
                  Click generate to create a code
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex-1 bg-zinc-950 text-white hover:bg-zinc-800 active:scale-[0.97] transition-all"
            data-testid={`regenerate-button-${brand.id}`}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            {code ? "Regenerate" : "Generate"}
          </Button>
          <Button
            onClick={handleCopy}
            disabled={!code}
            variant="outline"
            className="px-4 border-zinc-200 hover:bg-zinc-50 active:scale-[0.97] transition-all"
            data-testid={`copy-button-${brand.id}`}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
