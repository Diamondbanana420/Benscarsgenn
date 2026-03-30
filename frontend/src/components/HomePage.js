import { useState, useEffect } from "react";
import axios from "axios";
import { Gift, Zap, Info } from "lucide-react";
import BrandCard from "@/components/BrandCard";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BRAND_ORDER = [
  "amazon", "netflix", "spotify", "steam", "apple", "google_play",
  "uber_eats", "coles", "woolworths", "seven_eleven", "shein", "cotton_on", "forever_new"
];

export default function HomePage() {
  const [brands, setBrands] = useState([]);
  const [codes, setCodes] = useState({});
  const [loading, setLoading] = useState({});
  const [verifying, setVerifying] = useState({});
  const [verifyStatus, setVerifyStatus] = useState({});
  const [stats, setStats] = useState(0);

  useEffect(() => {
    fetchBrands();
    fetchStats();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${API}/brands`);
      setBrands(res.data);
    } catch (e) {
      console.error("Failed to fetch brands:", e);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/stats`);
      setStats(res.data.total_generations);
    } catch (e) {
      console.error("Failed to fetch stats:", e);
    }
  };

  const generateCode = async (brandId) => {
    setLoading((prev) => ({ ...prev, [brandId]: true }));
    setVerifyStatus((prev) => ({ ...prev, [brandId]: null }));
    try {
      const res = await axios.post(`${API}/generate/${brandId}`);
      setCodes((prev) => ({ ...prev, [brandId]: res.data.code }));
      setStats((prev) => prev + 1);
    } catch (e) {
      console.error("Failed to generate code:", e);
    } finally {
      setLoading((prev) => ({ ...prev, [brandId]: false }));
    }
  };

  const verifyCode = async (brandId) => {
    if (!codes[brandId]) return;
    setVerifying((prev) => ({ ...prev, [brandId]: true }));
    setVerifyStatus((prev) => ({ ...prev, [brandId]: null }));
    try {
      const res = await axios.post(`${API}/verify/${brandId}?code=${codes[brandId]}`);
      setVerifyStatus((prev) => ({ ...prev, [brandId]: res.data.verified }));
    } catch (e) {
      console.error("Failed to verify code:", e);
    } finally {
      setVerifying((prev) => ({ ...prev, [brandId]: false }));
    }
  };

  const sortedBrands = [...brands].sort(
    (a, b) => BRAND_ORDER.indexOf(a.id) - BRAND_ORDER.indexOf(b.id)
  );

  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200">
        <img
          src="https://static.prod-images.emergentagent.com/jobs/18547a51-a35a-4b4c-bcb3-4e63a1392c93/images/7fe1f52859d3568acd65062b6fc69421972c647ab964bb4a819e76f40b0743a2.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10"
        />
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-zinc-950 flex items-center justify-center">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-zinc-500 tracking-wide uppercase" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Negged CardGen
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-zinc-950 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
            data-testid="hero-title"
          >
            Generate. Copy.
            <br />
            <span className="text-zinc-400">Redeem.</span>
          </h1>
          <p
            className="text-base md:text-lg text-zinc-500 max-w-xl leading-relaxed"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Pick a brand, smash regenerate, and pray to the algorithm gods that one sticks.
          </p>
          <div className="flex items-center gap-2 mt-8 text-sm text-zinc-400" style={{ fontFamily: "'Manrope', sans-serif" }}>
            <Zap className="h-4 w-4" />
            <span data-testid="stats-counter">{stats.toLocaleString()} codes generated</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pt-12 md:pt-16" data-testid="how-it-works">
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 md:p-8 flex gap-4">
          <Info className="h-5 w-5 text-zinc-400 mt-0.5 shrink-0" />
          <div style={{ fontFamily: "'Manrope', sans-serif" }}>
            <h2 className="text-lg font-semibold text-zinc-900 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              How does this work?
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              This tool generates random alphanumeric codes that match the format of real gift cards for each brand.
              Each brand uses a different code structure — hit <strong className="text-zinc-700">Regenerate</strong> to roll a new one,
              then use the <strong className="text-zinc-700">Verify</strong> button to check if the code is valid.
              Keep generating and verifying until you land on a working code.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ alignItems: "start" }}
          data-testid="brand-grid"
        >
          {sortedBrands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              code={codes[brand.id]}
              isLoading={loading[brand.id]}
              isVerifying={verifying[brand.id]}
              verifyStatus={verifyStatus[brand.id]}
              onGenerate={() => generateCode(brand.id)}
              onVerify={() => verifyCode(brand.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
