
import { motion } from "framer-motion"
import { Button } from "./ui/button"

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-[#f5f5f5] px-3 py-1 text-sm"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-[#4361EE]"></span>
            <span>How it works</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-[#313131]"
          >
            An end-to-end solution for conversational AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-[#6e7687]"
          >
            With our platform, your customers can effortlessly find answers, resolve issues, and take meaningful actions
            through seamless and engaging AI-driven conversations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="rounded-full">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4361EE]/5"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#1FB7DD]/5"
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  )
}
