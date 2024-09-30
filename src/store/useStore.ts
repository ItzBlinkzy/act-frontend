import { stat } from "fs"
import { create } from "zustand"

// Define the types for the store's state and actions
export interface StoreState {
	name: string
	email: string
}

const useStore = create<StoreState>((set) => ({
	name: "John",
	email: "JohnDoe@gmail.com",
	setEmail: (newEmail: string) => set({ email: newEmail }),
}))

export default useStore
