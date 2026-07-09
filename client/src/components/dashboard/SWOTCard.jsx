import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Rocket,
  TrendingDown,
} from "lucide-react";

const SWOTItem = ({
  title,
  icon,
  color,
  data,
}) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="
    rounded-3xl
    border
    border-white/10
    bg-white/5
    backdrop-blur-xl
    p-6
    transition
    hover:border-blue-500/30
    "
  >
    <div className="flex items-center gap-3 mb-5">

      <div
        className="
        rounded-2xl
        p-3
        bg-white/5
        "
      >
        {icon}
      </div>

      <h3
        className={`
        text-xl
        font-black
        ${color}
        `}
      >
        {title}
      </h3>

    </div>

    <ul className="space-y-3">

      {(data || []).map((item, index) => (

        <li
          key={index}
          className="
          swot-list-item
          rounded-xl
          border
          border-white/5
          bg-black/10
          px-4
          py-3
          text-slate-300
          leading-7
          "
        >
          {item}
        </li>

      ))}

    </ul>

  </motion.div>
);

const SWOTCard = ({ report }) => {
  if (!report) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6 }}
      className="
      rounded-[32px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-8
      shadow-2xl
      "
    >
      <div className="mb-10">

        <h2 className="text-4xl font-black">

          SWOT Analysis

        </h2>

        <p className="mt-2 text-slate-400">

          AI generated strategic analysis

        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <SWOTItem
          title="Strengths"
          color="text-green-400"
          icon={<ShieldCheck className="text-green-400" />}
          data={report.swot?.strengths}
        />

        <SWOTItem
          title="Weaknesses"
          color="text-yellow-400"
          icon={<AlertTriangle className="text-yellow-400" />}
          data={report.swot?.weaknesses}
        />

        <SWOTItem
          title="Opportunities"
          color="text-cyan-400"
          icon={<Rocket className="text-cyan-400" />}
          data={report.swot?.opportunities}
        />

        <SWOTItem
          title="Threats"
          color="text-red-400"
          icon={<TrendingDown className="text-red-400" />}
          data={report.swot?.threats}
        />

      </div>

    </motion.div>
  );
};

export default SWOTCard;
