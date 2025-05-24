import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4 px-4"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div className="relative z-10 container max-w-6xl mx-auto flex items-center justify-between bg-white/90 backdrop-blur-xs rounded-full shadow-md px-6 py-2 border border-white/70">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#4361EE]">armin</span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#4361EE] to-[#1FB7DD] bg-clip-text text-transparent">
              cx
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            WhatsApp
          </a>
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Email
          </a>
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Phone
          </a>
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Socials
          </a>
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Features
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button className="rounded-full">Demo Request</Button>
          <Link to="/signin" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
