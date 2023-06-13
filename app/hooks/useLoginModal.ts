import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: true,
}));

export default useLoginModal;
