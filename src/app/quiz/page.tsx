"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ── Body Shape Data ───────────────────────────────────────────────────────────
const bodyShapes = [
  {
    id: "rectangle",
    label: "Rectangle",
    sub: "Shoulders and hips align. Minimal waist definition.",
    icon: (
      <svg viewBox="0 0 60 120" width="52" height="104" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="30" cy="14" rx="10" ry="10" />
        <line x1="20" y1="28" x2="14" y2="56" />
        <line x1="40" y1="28" x2="46" y2="56" />
        <path d="M14 56 Q14 65 16 70 L20 90 L16 115" />
        <path d="M46 56 Q46 65 44 70 L40 90 L44 115" />
        <path d="M16 70 Q30 72 44 70" />
        <path d="M14 56 Q30 60 46 56" />
        <path d="M20 90 Q30 93 40 90" />
      </svg>
    ),
    style: "Blazers & belted pieces define your silhouette with structure.",
  },
  {
    id: "invertedTriangle",
    label: "Inverted Triangle",
    sub: "Broad shoulders, narrower hips. Athletic build.",
    icon: (
      <svg viewBox="0 0 60 120" width="52" height="104" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="30" cy="14" rx="10" ry="10" />
        <line x1="20" y1="28" x2="10" y2="52" />
        <line x1="40" y1="28" x2="50" y2="52" />
        <path d="M10 52 Q15 65 18 72 L22 90 L20 115" />
        <path d="M50 52 Q45 65 42 72 L38 90 L40 115" />
        <path d="M18 72 Q30 75 42 72" />
        <path d="M22 90 Q30 93 38 90" />
      </svg>
    ),
    style: "Wide-leg trousers and pleated cuts balance your proportions beautifully.",
  },
  {
    id: "hourglass",
    label: "Hourglass",
    sub: "Balanced shoulders and hips. Defined natural waist.",
    icon: (
      <svg viewBox="0 0 60 120" width="52" height="104" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="30" cy="14" rx="10" ry="10" />
        <line x1="20" y1="28" x2="12" y2="52" />
        <line x1="40" y1="28" x2="48" y2="52" />
        <path d="M12 52 Q20 60 22 68 Q24 75 18 82 L16 115" />
        <path d="M48 52 Q40 60 38 68 Q36 75 42 82 L44 115" />
        <path d="M22 68 Q30 71 38 68" />
        <path d="M18 82 Q30 87 42 82" />
      </svg>
    ),
    style: "Fitted silhouettes and wrap cuts celebrate your natural proportions.",
  },
];

const occasions = [
  {
    id: "JOB_INTERVIEW",
    label: "Job Interview",
    sub: "Tailored authority for decisive moments.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    id: "GYM",
    label: "Gym",
    sub: "Performance elevated to an aesthetic.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4" />
      </svg>
    ),
  },
  {
    id: "DINNER_NIGHT",
    label: "Dinner Night",
    sub: "An entrance. A lasting impression.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
  },
];

const prefOptions = [
  "Minimalist",
  "Bold",
  "Monochrome",
  "Earth Tones",
  "Structured",
  "Relaxed Fit",
];

const steps = ["Occasion", "Body Shape", "Preferences"];

// ── Loading Sequence Messages ─────────────────────────────────────────────────
const loadingMessages = [
  "Analysing your profile...",
  "Mapping body proportions to silhouettes...",
  "Cross-referencing occasion intelligence...",
  "Curating your personal collection...",
];

// ── Step Indicator ────────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-14">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 flex items-center justify-center border text-[10px] font-medium transition-all duration-700 ${
                i < current
                  ? "bg-[var(--gold)] border-[var(--gold)] text-[var(--bg-primary)]"
                  : i === current
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-[var(--glass-border)] text-[var(--silver-500)]"
              }`}
            >
              {i < current ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : ( i + 1 )}
            </div>
            <span className={`text-[8px] uppercase tracking-[0.16em] mt-1.5 ${
              i === current ? "text-[var(--gold)]" : "text-[var(--silver-500)]"
            }`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="w-16 h-px mx-2 mb-4 transition-all duration-700"
              style={{ background: i < current ? "var(--gold)" : "var(--glass-border)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── AI Loading Overlay ────────────────────────────────────────────────────────
function AILoadingScreen({ onDone }: { onDone: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Advance message every 600ms
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, loadingMessages.length - 1));
    }, 700);

    // Advance progress bar
    const progTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(progTimer); return 100; }
        return p + 2.5;
      });
    }, 70);

    // Navigate after all messages shown
    const doneTimer = setTimeout(onDone, 3200);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Radial pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[var(--gold)]"
            style={{ opacity: 0.06 }}
            animate={{ scale: [1, 2.5], opacity: [0.08, 0] }}
            transition={{ duration: 3, delay: i * 0.9, repeat: Infinity, ease: "easeOut" }}
            initial={{ width: 120, height: 120 }}
          />
        ))}
      </div>

      {/* ThreadCode mark */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center mb-10"
      >
        <p className="font-serif text-4xl text-[var(--silver-100)] mb-1">
          Thread<span className="gold-text">Code</span>
        </p>
        <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--silver-500)]">
          Style Intelligence Engine
        </p>
      </motion.div>

      {/* Cycling message */}
      <div className="relative z-10 h-8 mb-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-light text-[var(--silver-400)] tracking-wide"
          >
            {loadingMessages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-48 h-px bg-[var(--glass-border)]">
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{
            background: "linear-gradient(90deg, var(--gold-dark), var(--gold))",
            width: `${progress}%`,
          }}
          transition={{ ease: "linear" }}
        />
      </div>

      <p className="relative z-10 mt-4 text-[9px] uppercase tracking-[0.22em] text-[var(--silver-500)]">
        {Math.round(progress)}%
      </p>
    </motion.div>
  );
}

// ── Inner Quiz ────────────────────────────────────────────────────────────────
function QuizInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [occasion, setOccasion] = useState(searchParams.get("occasion") ?? "");
  const [bodyShape, setBodyShape] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);

  function handleFinish() {
    if (preferences.length === 0) return;
    setIsAnalyzing(true);
  }

  function handleAnalysisDone() {
    router.push(
      `/shop?occasion=${occasion}&shape=${bodyShape}&prefs=${encodeURIComponent(preferences.join(","))}`
    );
  }

  return (
    <>
      <AnimatePresence>
        {isAnalyzing && (
          <AILoadingScreen onDone={handleAnalysisDone} />
        )}
      </AnimatePresence>

      <div className="max-w-[700px] mx-auto">
        <StepIndicator current={step} />

        <AnimatePresence mode="wait">
          {/* ── Step 0: Occasion ── */}
          {step === 0 && (
            <motion.div
              key="step-occasion"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl text-[var(--silver-100)] mb-2">
                What is the occasion?
              </h2>
              <p className="text-sm text-[var(--silver-400)] font-light mb-8">
                Your environment shapes your silhouette.
              </p>
              <div className="space-y-3">
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => { setOccasion(occ.id); setTimeout(() => setStep(1), 320); }}
                    className={`w-full text-left glass glass-hover p-5 flex items-center gap-4 group transition-all duration-500 ${
                      occasion === occ.id ? "border-[var(--gold)] bg-[rgba(201,169,122,0.04)]" : ""
                    }`}
                    style={{ borderRadius: "2px" }}
                  >
                    <div className={`flex-shrink-0 transition-colors duration-500 ${
                      occasion === occ.id ? "text-[var(--gold)]" : "text-[var(--silver-400)] group-hover:text-[var(--gold-light)]"
                    }`}>
                      {occ.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[var(--silver-200)] group-hover:text-[var(--gold-light)] transition-colors duration-500 font-light leading-none mb-1">
                        {occ.label}
                      </p>
                      <p className="text-[10px] text-[var(--silver-500)] font-light">{occ.sub}</p>
                    </div>
                    {occasion === occ.id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--gold)] flex-shrink-0">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 1: Body Shape ── */}
          {step === 1 && (
            <motion.div
              key="step-body"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl text-[var(--silver-100)] mb-2">
                Your body shape
              </h2>
              <p className="text-sm text-[var(--silver-400)] font-light mb-8">
                Proportions guide every recommendation we make for you.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {bodyShapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => { setBodyShape(shape.id); setTimeout(() => setStep(2), 380); }}
                    className={`glass glass-hover p-5 flex flex-col items-center gap-4 group transition-all duration-500 ${
                      bodyShape === shape.id ? "border-[var(--gold)] bg-[rgba(201,169,122,0.04)]" : ""
                    }`}
                    style={{ borderRadius: "2px" }}
                  >
                    <div className={`transition-colors duration-500 ${
                      bodyShape === shape.id ? "text-[var(--gold)]" : "text-[var(--silver-400)] group-hover:text-[var(--gold-light)]"
                    }`}>
                      {shape.icon}
                    </div>
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-[0.14em] text-[var(--silver-200)] mb-1.5">
                        {shape.label}
                      </p>
                      <p className="text-[10px] text-[var(--silver-500)] font-light leading-relaxed">
                        {shape.sub}
                      </p>
                    </div>
                    <AnimatePresence>
                      {bodyShape === shape.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[9px] text-[var(--gold)] text-center leading-relaxed overflow-hidden"
                        >
                          {shape.style}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Preferences ── */}
          {step === 2 && (
            <motion.div
              key="step-prefs"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl text-[var(--silver-100)] mb-2">
                Style preferences
              </h2>
              <p className="text-sm text-[var(--silver-400)] font-light mb-8">
                Select all that resonate with your aesthetic. Your collection is filtered by these.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {prefOptions.map((pref) => {
                  const selected = preferences.includes(pref);
                  return (
                    <button
                      key={pref}
                      onClick={() =>
                        setPreferences((prev) =>
                          prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
                        )
                      }
                      className={`glass glass-hover p-4 text-left text-xs uppercase tracking-[0.12em] flex items-center justify-between transition-all duration-500 ${
                        selected ? "border-[var(--gold)] text-[var(--gold-light)]" : "text-[var(--silver-200)]"
                      }`}
                      style={{ borderRadius: "2px" }}
                    >
                      {pref}
                      <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                        selected ? "border-[var(--gold)] bg-[var(--gold)]" : "border-[var(--glass-border)]"
                      }`}>
                        {selected && (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--bg-primary)]">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected count */}
              {preferences.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] uppercase tracking-[0.18em] text-[var(--gold)] mb-4"
                >
                  {preferences.length} preference{preferences.length !== 1 ? "s" : ""} selected
                </motion.p>
              )}

              <button
                onClick={handleFinish}
                disabled={preferences.length === 0}
                className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed text-[11px]"
              >
                Analyse My Profile
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back */}
        {step > 0 && !isAnalyzing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setStep((s) => s - 1)}
            className="mt-8 text-[10px] uppercase tracking-[0.16em] text-[var(--silver-500)] hover:text-[var(--silver-300)] transition-colors duration-400 flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </motion.button>
        )}
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function QuizPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="bg-radial-luxury absolute inset-0 pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-5 h-px bg-[var(--gold)]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
              Personal Styling
            </span>
            <div className="w-5 h-px bg-[var(--gold)]" />
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,4vw,3.5rem)] text-[var(--silver-100)]">
            Style Intelligence Quiz
          </h1>
          <p className="text-sm text-[var(--silver-400)] font-light mt-3 max-w-md mx-auto">
            Three considered questions. One perfectly assembled wardrobe.
          </p>
        </motion.div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-16">
            <div className="text-[9px] uppercase tracking-[0.22em] text-[var(--silver-500)]">Loading...</div>
          </div>
        }>
          <QuizInner />
        </Suspense>
      </div>
    </div>
  );
}
