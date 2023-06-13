import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: true,
}));

export default useRegisterModal;
