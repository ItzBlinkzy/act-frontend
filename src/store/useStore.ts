import { create } from "zustand"

// Define the types for the store's state and actions

export interface UserInfo {
	id: number
	firstName: string
	lastName: string
	email: string
	userType: "Fund Manager" | "Fund Administrator" | null
}

export interface StoreModel {
	user: UserInfo | null // user can be either UserInfo or null initially
	setUser: (userInfo: UserInfo) => void
}

const useStore = create<StoreModel>((set) => ({
	user: null, // initial user state is null
	setUser: (userInfo: UserInfo) =>
		set((state) => ({
			user: { ...state.user, ...userInfo }, // correct usage of the spread operator
		})),
}))

export default useStore
