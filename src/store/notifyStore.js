import { create } from 'zustand'

let notifySeq = 0

export const useNotifyStore = create((set) => ({
  messages: [],
  show: (payload) => {
    notifySeq += 1
    const id = `${Date.now()}-${notifySeq}`
    const msg = { id, variant: 'default', ...payload }
    set((s) => ({ messages: [...s.messages, msg] }))
    setTimeout(() => {
      useNotifyStore.setState((s) => ({
        messages: s.messages.filter((m) => m.id !== id),
      }))
    }, 4500)
  },
}))
