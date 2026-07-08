import { motion } from "framer-motion";
import {
  Brain,
  Target,
  ShieldAlert,
  Sparkles,
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