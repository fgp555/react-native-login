import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir el tipo para el store
interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (user: { username: string }) => Promise<void>;
  logout: () => Promise<void>;
  loadUserFromStorage: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (user) => {
    set({ isAuthenticated: true, user });
    await AsyncStorage.setItem('user', JSON.stringify(user)); // Guardar el usuario en AsyncStorage
  },
  logout: async () => {
    set({ isAuthenticated: false, user: null });
    await AsyncStorage.removeItem('user'); // Eliminar usuario de AsyncStorage
  },
  loadUserFromStorage: async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      set({ isAuthenticated: true, user: JSON.parse(storedUser) });
    }
  },
}));

export default useAuthStore;
