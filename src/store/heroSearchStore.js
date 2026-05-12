import { create } from 'zustand'

/** Landing hero search tabs (tour packages vs flights) */
export const useHeroSearchStore = create((set) => ({
  tab: 'holidays',
  setTab: (tab) => set({ tab: tab === 'flights' ? 'flights' : 'holidays' }),
}))
