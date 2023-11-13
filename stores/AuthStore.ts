import { create } from "zustand";
import { User } from "firebase/auth";
interface AuthState {
  user: User | null;
  roles: any;
  loading: boolean;
  rolesLoading: boolean;
  logOut: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setRoles: (roles: any) => void;
  setRolesLoading: (rolesLoading: boolean) => void;

}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  roles: {},
  loading: false,
  rolesLoading: true,
  setLoading: (loading: boolean) => set({ loading }),
  logOut: () => set({ user: null }),
  setUser: (user: User | null) => set({ user }),
  setRoles: (roles: any) => set({ roles }),
  setRolesLoading: (rolesLoading: boolean) => set({ rolesLoading }),
}));
