import { motion } from "framer-motion";
import {
  Brain,
  Target,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const Section = ({ icon, title, children }) => (
  <div
    className="
    rounded-2xl
    border
    border-white/10
    bg-white/5
    p-6
    "
  >
    <div className="flex items-center gap-3 mb-4">

      <div className="rounded-xl bg-blue-500/10 p-2">

        {icon}

      </div>

      <h3 className="text-xl font-bold">

        {title}

      </h3>

    </div>

    <p className="leading-8 text-slate-300 whitespace-pre-line">

      {children || "No information available."}

    </p>

  </div>
);

const AIReportCard = ({ report }) => {
  if (!report) return null;

  const recommendation = (report.recommendation || "HOLD").toUpperCase();

  const recommendationStyles = {
    BUY: {
      label: "BUY",
      color: "border-green-500/30 bg-green-500/15 text-green-400",
      message: "Buy signal: the analysis points to favorable upside against current risk."
    },
    HOLD: {
      label: "HOLD",
      color: "border-yellow-500/30 bg-yellow-500/15 text-yellow-400",
      message: "Hold signal: the analysis is balanced, so waiting for a stronger setup is prudent."
    },
    SELL: {
      label: "SELL",
      color: "border-red-500/30 bg-red-500/15 text-red-400",
      message: "Sell signal: the analysis points to an unfavorable risk-reward setup."
    }
  };

  const recommendationMeta =
    recommendationStyles[recommendation] || recommendationStyles.HOLD;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6 }}
      whileHover={{ y: -5 }}
      className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-8
      shadow-2xl
      "
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />

      <div className="flex items-center justify-between mb-10">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-500/10 p-4">

            <Brain
              className="text-blue-400"
              size={26}
            />

          </div>

          <div>

            <h2 className="text-3xl font-black">

              AI Investment Thesis

            </h2>

            <p className="text-slate-400">

              Generated using financial data,
              news sentiment and AI reasoning.

            </p>

          </div>

        </div>

        <Sparkles className="text-cyan-400" size={28} />

      </div>

      <div className="grid gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-500/10 p-2">

                <TrendingUp className="text-blue-400" />

              </div>

              <div>

                <h3 className="text-xl font-bold">

                  Investment Decision

                </h3>

                <div className="mt-2 leading-7 text-slate-300">

                  {recommendationMeta.message}

                </div>

              </div>

            </div>

            <span
              className={`
              inline-flex
              w-fit
              items-center
              rounded-full
              border
              px-5
              py-2
              text-lg
              font-black
              ${recommendationMeta.color}
              `}
            >
              {recommendationMeta.label}
            </span>

          </div>

        </div>

        <Section
          title="Investment Summary"
          icon={<Target className="text-blue-400" />}
        >
          {report.summary}
        </Section>

        <Section
          title="Valuation"
          icon={<Brain className="text-cyan-400" />}
        >
          {report.valuation}
        </Section>

        <Section
          title="Potential Risks"
          icon={<ShieldAlert className="text-red-400" />}
        >
          {report.risks}
        </Section>

      </div>

    </motion.div>
  );
};

export default AIReportCard;
