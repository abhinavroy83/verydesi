'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
}

export default function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/sign-in')
    } else if (requiredPermission && 
               !hasRequiredPermission(session.user, requiredPermission)) {
      router.push('/unauthorized')
    }
  }, [session, status, router, requiredPermission])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  if (requiredPermission && !hasRequiredPermission(session.user, requiredPermission)) {
    return null
  }

  return <>{children}</>
}

function hasRequiredPermission(user: any, requiredPermission: string): boolean {
  return user.role === 'admin' || (Array.isArray(user.permissions) && user.permissions.includes(requiredPermission))
}