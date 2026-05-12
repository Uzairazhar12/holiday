import { create } from 'zustand'

/** Landing hero search tabs (Holidays vs Flights) */
export const useHeroSearchStore = create((set) => ({
  tab: 'holidays',
  setTab: (tab) => set({ tab: tab === 'flights' ? 'flights' : 'holidays' }),
}))
