import { create } from "zustand"

type Modal = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useMintModal = create<Modal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
