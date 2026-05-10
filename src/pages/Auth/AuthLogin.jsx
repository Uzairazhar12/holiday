import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { loginWithEmailPassword } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { notify } from '@/utils/notify'
import { isFirebaseConfigured } from '@/api/firebase'

export default function AuthLogin() {
  const { user, role, loading } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && user && role === 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!isFirebaseConfigured()) {
      notify({
        variant: 'destructive',
        title: 'Firebase missing',
        description: 'Configure .env with VITE_FIREBASE_* keys.',
      })
      return
    }
    setBusy(true)
    try {
      const { role: nextRole } = await loginWithEmailPassword(email, password)
      if (nextRole !== 'admin') {
        notify({
          variant: 'destructive',
          title: 'Not authorised',
          description: 'This portal is for administrators only.',
        })
        await useAuthStore.getState().logout()
        return
      }
      navigate(from.startsWith('/dashboard') ? from : '/dashboard', { replace: true })
    } catch (err) {
      notify({
        variant: 'destructive',
        title: 'Login failed',
        description: err.message || 'Check credentials.',
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <SEO title="Admin sign in" description="Secure Marvel Travel UK dashboard access." />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Dashboard login</CardTitle>
            <CardDescription>
              Admin accounts only — powered by Firebase Authentication & Firestore roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
