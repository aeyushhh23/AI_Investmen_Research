import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertTriangle,
  Brain,
  Target,
} from "lucide-react";

const ScoreCard = ({ scores }) => {
  if (!scores) return null;

  const score = Number(scores.investmentScore);
  const recommendation =
    scores.recommendation ||
    (
      score >= 70 && scores.risk !== "High"
        ? "BUY"
        : score <= 40 || scores.risk === "High"
        ? "SELL"
        : "HOLD"
    );

  const recommendationColor =
    recommendation === "BUY"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : recommendation === "HOLD"
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";

  const riskColor =
    scores.risk === "Low"
      ? "text-green-400"
      : scores.risk === "Medium"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="
      magnetic-card
      relative
      overflow-hidden
      rounded-[30px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-8
      shadow-2xl
      hover:border-cyan-400/40
      hover:shadow-cyan-500/20
      "
    >
      <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-cyan-500/10 p-3">

            <Brain className="text-cyan-400" />

          </div>

          <div>

            <h2 className="text-xl font-black sm:text-2xl">

              AI Confidence

            </h2>

            <p className="text-sm text-slate-400">

              Machine Learning Analysis

            </p>

          </div>

        </div>

      </div>

      {/* Score */}

      <div className="mt-10 flex justify-center">

        <div className="relative h-48 w-48 sm:h-56 sm:w-56">

          <svg viewBox="0 0 224 224" className="absolute inset-0 -rotate-90 w-full h-full">

            <circle
              cx="112"
              cy="112"
              r="92"
              stroke="rgba(255,255,255,.08)"
              strokeWidth="12"
              fill="transparent"
            />

            <motion.circle
              cx="112"
              cy="112"
              r="92"
              fill="transparent"
              stroke="#06b6d4"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: score / 100,
              }}
              transition={{
                duration: 1.3,
              }}
              style={{
                pathLength: score / 100,
              }}
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <motion.div
              initial={{ scale: .7 }}
              animate={{ scale: 1 }}
              className="flex items-baseline gap-1"
            >
              <h1 className="text-5xl font-black sm:text-6xl">{score}</h1>
              <p className="text-xl text-slate-400 font-semibold">
                /100
              </p>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Recommendation */}

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-slate-400">

            <TrendingUp size={18} />

            Recommendation

          </div>

          <span
            className={`
            rounded-full
            border
            px-4
            py-1
            font-bold
            ${recommendationColor}
            `}
          >
            {recommendation}
          </span>

        </div>

      </div>

      {/* Risk */}

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-slate-400">

            <AlertTriangle size={18} />

            Risk Level

          </div>

          <span className={`font-bold ${riskColor}`}>

            {scores.risk}

          </span>

        </div>

      </div>

      {/* Confidence */}

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-slate-400">

            <Target size={18} />

            Confidence

          </div>

          <span className="font-bold text-cyan-400">

            {score}%

          </span>

        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${score}%`,
            }}
            transition={{
              duration: 1.2,
            }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          />

        </div>

      </div>

    </motion.div>
  );
};

export default ScoreCard;
