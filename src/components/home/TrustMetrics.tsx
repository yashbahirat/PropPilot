"use client"

import { useEffect, useRef } from 'react'
import { LazyMotion, domAnimation, m, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { CheckCircle, Users, BarChart3 } from 'lucide-react'

const metrics = [
  { label: 'Verified Deals', target: 150, suffix: '+', icon: CheckCircle },
  { label: 'Active Traders', target: 12, suffix: 'K+', icon: Users },
  { label: 'Firms Compared', target: 45, suffix: '', icon: BarChart3 },
]

function AnimatedCounter({ target, suffix }: { target: number, suffix: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix)

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: "easeOut" })
    }
  }, [isInView, target, count])

  return <m.h3 ref={ref} className="text-4xl md:text-5xl font-bold text-white mb-2">{rounded}</m.h3>
}

export function TrustMetrics() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-16 border-y border-white/5 bg-[#0A0A16]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon
              return (
                <m.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center justify-center pt-8 md:pt-0"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00D4AA]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#00D4AA]" />
                  </div>
                  <AnimatedCounter target={metric.target} suffix={metric.suffix} />
                  <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">{metric.label}</p>
                </m.div>
              )
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}
