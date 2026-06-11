'use client'

import HeroSection from './HeroSection'
import VehicleSlider from './VehicleSlider'
import AuthModal from './AuthModal'

import { useState } from 'react'

const PublicHome = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  return (
    <>
      <HeroSection onLoginClick={() => setIsAuthModalOpen(true)} />
      <VehicleSlider />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

export default PublicHome