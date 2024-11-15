import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define the types for the store's state and actions

export interface UserInfo {
	id: number
	firstName: string
	lastName: string
	email: string
	userType: "Fund Manager" | "Fund Administrator" | null
	credit: number | null
}

interface IClient {
	id: string
	company_name: string
	created_at: string
	updated_at: string
	deleted_at: Date | null
}

export interface StoreModel {
	user: UserInfo | null // user can be either UserInfo or null initially
	setUser: (userInfo: UserInfo) => void
	managerClients: IClient[]
	setManagerClients: (clients: IClient[]) => void
	usingSocialLogin: boolean
	setUsingSocialLogin: (value: boolean) => void
}

const useStore = create<StoreModel>()((set) => ({
	user: null, // initial user state is null
	setUser: (userInfo: UserInfo) =>
		set((state) => ({
			user: { ...state.user, ...userInfo }, // correct usage of the spread operator
		})),
	managerClients: [],
	setManagerClients: (clients) =>
		set(() => ({
			managerClients: clients, // correct usage of the spread operator
		})),
	usingSocialLogin: false, // Initial state for usingSocialLogin
	setUsingSocialLogin: (value: boolean) =>
		set(() => ({
			usingSocialLogin: value,
		})),
}))

const usePersistedStore = create<Pick<StoreModel, "usingSocialLogin" | "setUsingSocialLogin">>()(
	persist(
		(set) => ({
			usingSocialLogin: false,
			setUsingSocialLogin: (value: boolean) => set(() => ({ usingSocialLogin: value })),
		}),
		{
			name: "using-social-login-storage", // Choose an appropriate name for localStorage key
			partialize: (state) => ({
				usingSocialLogin: state.usingSocialLogin,
			}), // Only persist usingSocialLogin
		},
	),
)

// Export stores as default exports for consistency
export default useStore
export { usePersistedStore }
