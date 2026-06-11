
"use client"

import { Bike, Bus, Car, Truck } from 'lucide-react'
import { motion } from 'motion/react'

const HeroSection = ({ onLoginClick }: { onLoginClick: () => void }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/heroImage.jpg')" }}/>
      <div className="absolute inset-0 bg-black/80"/>
      <div className="relative z-10 flex flex-col min-h-screen px-4 text-center items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-white sm:text-5xl md:text-7xl"
        >
          Book Your Next Ride
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg text-gray-300 mt-4 max-w-xl"
        >
          Find your perfect ride today
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-8 text-gray-300"
        >
          <Bike size={30} />
          <Car size={30} />
          <Bus size={30} />
          <Truck size={30} />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 bg-white text-black px-10 py-4 rounded-full transition-colors shadow-xl font-semibold"
          onClick={onLoginClick}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  )
}

export default HeroSection