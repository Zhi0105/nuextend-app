import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

let eventStore = (set) => ({
    upcoming: [],
    setUpcoming: (data) => set(() => ({
        upcoming: [ ...data ]
    })),
})

const useEventStore = create(persist(eventStore, {
    name: "event",
    storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
}))

export default useEventStore