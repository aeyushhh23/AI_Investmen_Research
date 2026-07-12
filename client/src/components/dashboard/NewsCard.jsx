import { motion } from "framer-motion";
import {
  Newspaper,
  ExternalLink,
  Clock3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const NewsCard = ({ article }) => {
  if (!article) return null;

  const positive =
    article.sentiment === "Positive" ||
    article.sentimentScore > 0;

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="
      group
      magnetic-card
      relative
      overflow-hidden
      flex
      flex-col
      rounded-[30px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-6
      shadow-xl
      hover:border-blue-500/40
      hover:shadow-blue-500/20
      "
    >
      {/* Glow */}

      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-3">

          <div className="rounded-2xl bg-blue-500/10 p-3">

            <Newspaper
              className="text-blue-400"
              size={20}
            />

          </div>

          <div className="min-w-0">

            <h3 className="truncate font-bold">

              {article.source || "Market News"}

            </h3>

            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">

              <Clock3 size={14} />

              {article.date || "Today"}

            </div>

          </div>

        </div>

        <ExternalLink
          className="text-slate-500 group-hover:text-blue-400 transition"
          size={18}
        />

      </div>

      {/* Headline */}

      <h2
        className="
        mt-6
        text-xl
        font-bold
        leading-8
        group-hover:text-blue-300
        transition
        "
      >
        {article.title}
      </h2>

      {/* Description */}

      <p
        className="
        mt-4
        text-slate-400
        leading-7
        line-clamp-4
        "
      >
        {article.summary ||
          article.description ||
          "No description available."}
      </p>

      {/* Footer */}

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">

        <div
          className={`
          flex
          items-center
          gap-2
          rounded-full
          px-4
          py-2
          border
          ${
            positive
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }
          `}
        >
          {positive ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          {positive ? "Bullish" : "Bearish"}

        </div>

        {article.sentimentScore !== undefined && (
          <span className="text-sm text-slate-400">
            Score: {Number(article.sentimentScore).toFixed(2)}
          </span>
        )}

      </div>

    </motion.a>
  );
};

export default NewsCard;
