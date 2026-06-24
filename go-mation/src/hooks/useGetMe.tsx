'use client'

import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/redux/userSlice'

const useGetMe = (enabled: boolean) => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!enabled) return
    const getMe = async () => {
      try {
        const { data } = await axios.get('/api/user/me')
        dispatch(setUserData(data))
      } catch (error) {
        console.error('Failed to get user data:', error)
      }
    }
    getMe()
  }, [enabled])
  
  return null
}

export default useGetMe