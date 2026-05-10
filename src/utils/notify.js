import { useNotifyStore } from '@/store/notifyStore'

export function notify(opts) {
  useNotifyStore.getState().show(opts)
}
