import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Landmark,
  Calendar,
  BadgeDollarSign,
  ExternalLink,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const CompanyCard = ({ company }) => {
  if (!company) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
      transition-all
      duration-300
      hover:border-blue-500/40
      hover:shadow-blue-500/20
      "
    >
      {/* Glow */}

      <div className="absolute -top-28 -right-20 h-60 w-60 rounded-full bg-blue-500/10 blur-[100px]" />

      {/* Header */}

      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-center gap-5">
          <div
            className="
            flex
            h-20
            w-20
            shrink-0
            items-center
            justify-center
            rounded-3xl
            bg-white
            shadow-xl
            sm:h-24
            sm:w-24
            "
          >
            <img
              src={company.logo}
              alt={company.companyName}
              className="h-16 w-16 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.companyName)}&background=2563eb&color=fff&size=128`;
              }}
            />
          </div>

          <div className="min-w-0">
            <span
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-500/30
              bg-blue-500/10
              px-3
              py-1
              text-xs
              font-semibold
              text-blue-400
              "
            >
              <TrendingUp size={14} />
              Listed Company
            </span>

            <h2 className="mt-4 break-words text-2xl font-black tracking-tight sm:text-3xl">
              {company.companyName}
            </h2>

            <p className="mt-1 text-slate-400">
              {company.symbol}
            </p>
          </div>
        </div>

        <div
          className="
          hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-3
          lg:flex
          "
        >
          <BarChart3 className="text-cyan-400" />
        </div>
      </div>

      {/* Metrics */}

      <div className="mt-10 grid grid-cols-2 gap-4">
        <Info
          icon={<Building2 size={18} />}
          title="Industry"
          value={company.industry}
        />

        <Info
          icon={<Globe size={18} />}
          title="Country"
          value={company.country}
        />

        <Info
          icon={<Landmark size={18} />}
          title="Exchange"
          value={company.exchange}
        />

        <Info
          icon={<Calendar size={18} />}
          title="IPO"
          value={company.ipo}
        />

        <Info
          icon={<BadgeDollarSign size={18} />}
          title="Currency"
          value={company.currency}
        />

        <Info
          icon={<TrendingUp size={18} />}
          title="Ticker"
          value={company.symbol}
        />
      </div>

      {/* Website */}

      <motion.a
        whileHover={{ x: 4 }}
        href={company.weburl}
        target="_blank"
        rel="noreferrer"
        className="
        mt-10
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-blue-500/20
        bg-blue-500/10
        px-5
        py-4
        text-blue-300
        transition
        hover:border-cyan-400
        hover:bg-blue-500/20
        "
      >
        <span className="font-semibold">
          Visit Official Website
        </span>

        <ExternalLink size={18} />
      </motion.a>
    </motion.div>
  );
};

const Info = ({ icon, title, value }) => (
  <div
    className="
    rounded-2xl
    border
    border-white/10
    bg-white/5
    p-4
    transition
    hover:border-blue-500/30
    "
  >
    <div className="flex items-center gap-2 text-slate-400">
      {icon}
      <span className="text-sm">{title}</span>
    </div>

    <h3 className="mt-3 text-lg font-bold break-words">
      {value || "--"}
    </h3>
  </div>
);

export default CompanyCard;
