import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let userStore = (set) => ({
  user: null,
  token: null,
  setUser: (data) => set(() => ({
    user: data
  })),
  setToken: (data) => set(() => ({
    token: data
  })),
  setUserLogout: () => set(() => ({ user: null, token: null }))
})

const useUserStore = create(persist(userStore, {
    name: "user",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useUserStore