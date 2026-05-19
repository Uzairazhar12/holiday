import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function DestinationCard({ dest, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="h-full"
    >
      <Link
        to={`/contact?destination=${encodeURIComponent(dest.city)}`}
        className="group relative flex h-[300px] w-full flex-col overflow-hidden rounded-2xl shadow-[0_8px_28px_-12px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-12px_rgba(15,118,110,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 sm:h-[320px]"
      >
        <img
          src={dest.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/35 to-slate-900/10" />

        <div className="relative mt-auto flex w-full flex-col p-5">
          <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.65rem]">
            {dest.city}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-white/90">
            {dest.country} | {dest.code}
          </p>
          <span className="mt-3 inline-flex w-fit rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-bold text-white shadow-md transition group-hover:bg-teal-700">
            From £{Number(dest.priceFrom).toLocaleString('en-GB')}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
