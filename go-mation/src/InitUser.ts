'use client'

import { useEffect } from 'react'
import useGetMe from './hooks/useGetMe'
import { useSession } from 'next-auth/react'

const InitUser = () => {
  const { status } = useSession()
  useGetMe(status == 'authenticated')
  return null
}

export default InitUser