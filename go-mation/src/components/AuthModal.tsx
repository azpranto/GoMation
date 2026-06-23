"use client"

import { CircleDashed, Lock, Mail, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'login' | 'signup' | 'otp';

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [step, setStep] = useState<AuthStep>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const { data } = useSession();
  
  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      
    } catch (error: any) {
      setError(error.response.data.error ?? 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setStep('otp');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/auth/verify-email', { email, otp: otp.join('') });
      
    } catch (error: any) {
      setError(error.response.data.error ?? 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setStep('login');
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    
    if (result?.error) {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn('google');
  };

  const handleOtpChange = (index: number, value: string) => {
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      // Move focus to next input
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (!value && index > 0) {
      // Move focus to previous input
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed inset-0 flex items-center justify-center px-4 z-100"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
            >
              <div className="relative w-full max-w-md rounded-3xl bg-white text-black border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8">
                <div className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer" onClick={onClose}>
                  <X size={20} />
                </div>

                <div className='text-center mb-6'>
                  <h1 className='text-3xl font-extrabold tracking-widest'>GoMation</h1>
                  <p className='text-xs text-gray-500 mt-1'>Automating your rides</p>
                </div>

                <button className='w-full h-11 font-semibold rounded-xl border border-black/20 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-colors' onClick={handleGoogleLogin}>
                  <Image src="/google.png" alt="Google" width={25} height={25} />
                  <span>Continue with Google</span>
                </button>

                <div className='flex items-center gap-4 my-4'>
                  <div className='flex-1 h-px bg-gray-200' />
                  <div>OR</div>
                  <div className='flex-1 h-px bg-gray-200' />
                </div>

                <div>
                  {step === 'login' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <h1 className='text-xl font-semibold'>Welcome Back</h1>
                      <div className='mt-5 space-y-4'>
                        <div className='flex items-center gap-3 px-4 py-3 rounded-xl border border-black/20'>
                          <Mail size={18} className='text-gray-500' />
                          <input type="email" placeholder="Email" className='w-full outline-none bg-transparent text-sm' onChange={(e) => {setEmail(e.target.value); setError('')}} value={email} />
                        </div>

                        <div className='flex items-center gap-3 px-4 py-3 rounded-xl border border-black/20'>
                          <Lock size={18} className='text-gray-500' />
                          <input type="password" placeholder="Password" className='w-full outline-none bg-transparent text-sm' onChange={(e) => {setPassword(e.target.value); setError('')}} value={password} />
                        </div>

                        <button className='w-full h-11 bg-black text-white font-semibold rounded-xl border border-black/20 flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors' onClick={handleLogin} disabled={isLoading}>
                          {isLoading ? <CircleDashed size={18} className='animate-spin' /> : 'Login'}
                        </button>
                      </div>

                      <p className='mt-6 text-center text-sm text-gray-600'>Don't have an account? <button className='text-black font-semibold hover:underline' onClick={() => setStep('signup')}>Sign up</button></p>
                    </motion.div>
                  )}
                  {step === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <h1 className='text-xl font-semibold'>Create Account</h1>
                      <div className='mt-5 space-y-4'>
                        <div className='flex items-center gap-3 px-4 py-3 rounded-xl border border-black/20'>
                          <User size={18} className='text-gray-500' />
                          <input type="text" placeholder="Full Name" className='w-full outline-none bg-transparent text-sm' onChange={(e) => {setName(e.target.value); setError('')}} value={name} />
                        </div>

                        <div className='flex items-center gap-3 px-4 py-3 rounded-xl border border-black/20'>
                          <Mail size={18} className='text-gray-500' />
                          <input type="email" placeholder="Email" className='w-full outline-none bg-transparent text-sm' onChange={(e) => {setEmail(e.target.value); setError('')}} value={email} />
                        </div>

                        <div className='flex items-center gap-3 px-4 py-3 rounded-xl border border-black/20'>
                          <Lock size={18} className='text-gray-500' />
                          <input type="password" placeholder="Password" className='w-full outline-none bg-transparent text-sm' onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>

                        {error && <p className='text-red-500 text-sm'>{error}</p>}

                        <button className='w-full h-11 font-semibold rounded-xl border border-black/20 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-colors' disabled={isLoading} onClick={handleSignup}>
                          {isLoading ? <CircleDashed size={18} className='animate-spin' /> : 'Sign Up'}
                        </button>
                      </div>

                      <p className='mt-6 text-center text-sm text-gray-600'>Already have an account? <button className='text-black font-semibold hover:underline' onClick={() => setStep('login')}>Login</button></p>
                    </motion.div>
                  )}
                  {step === 'otp' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className='text-2xl font-bold text-center mb-6'>Verify Email</h2>
                      <div className='mt-6 flex justify-between gap-2'>
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className='w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                        ))}
                      </div>
                      <button className='w-full mt-6 h-11 font-semibold rounded-xl border border-black/20 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-colors' onClick={handleVerifyOtp}>Verify</button>
                    </motion.div>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AuthModal