import { create } from 'zustand'
import { logoutUser, subscribeAuth } from '@/services/authService'

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  loading: true,

  setSession: ({ user, role }) =>
    set({
      user: user
        ? { uid: user.uid, email: user.email, displayName: user.displayName }
        : null,
      role: role || null,
      loading: false,
    }),

  logout: async () => {
    await logoutUser()
    set({ user: null, role: null, loading: false })
  },
}))

export function initAuthListener() {
  const { setSession } = useAuthStore.getState()
  return subscribeAuth((session) => {
    if (!session) setSession({ user: null, role: null })
    else setSession({ user: session.user, role: session.role })
    useAuthStore.setState({ loading: false })
  })
}
