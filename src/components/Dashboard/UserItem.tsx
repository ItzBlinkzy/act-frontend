import React from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/supabaseClient"
import { toast } from "@/hooks/use-toast"
import { baseApiUrl } from "@/config/constants"
import axios from "axios"
import useStore, { StoreModel, usePersistedStore } from "@/store/useStore"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { MenuIcon } from "lucide-react"
export default function UserItem() {
	const navigate = useNavigate()
	const user = useStore((state: StoreModel) => state.user)
	let initials = "??"
	if (user) {
		const firstInitial = user.firstName?.[0]?.toUpperCase() || ""
		const lastInitial = user.lastName?.[0]?.toUpperCase() || ""
		initials = firstInitial + lastInitial
	}

	const getBadgeColour = (): string => {
		if (user?.userType === "Fund Manager") return "bg-orange-400"
		return "bg-blue-600"
	}
	const handleLogout = async () => {
		try {
			const usingSocialLogin = usePersistedStore.getState().usingSocialLogin

			if (usingSocialLogin) {
				// Supabase social login logout
				const { error } = await supabase.auth.signOut()
				if (error) {
					// Notify the user about the failure with a destructive toast
					toast({
						title: "Logout Failed",
						description: "Could not log you out of your account (oauth). Please try again later.",
						variant: "destructive",
					})
					throw new Error("Failed to log out from Supabase")
				}
			} else {
				// Backend-managed logout for email/password users
				const response = await axios.post(`${baseApiUrl}/logout`, {}, { withCredentials: true })
				if (response.status !== 200) {
					throw new Error("Failed to log out from backend")
				}
			}

			// Clear global and persisted state
			useStore.setState({
				user: null,
				managerClients: [],
			})
			usePersistedStore.getState().setUsingSocialLogin(false)

			// Navigate to login page and show success toast
			navigate("/login")
			toast({
				title: "Signed Out Successfully",
				description: "You have been signed out of your account.",
				variant: "default",
			})
		} catch (err: any) {
			// General error handling
			toast({
				title: "Internal Server Error",
				description: "Could not log you out. Please try again later.",
				variant: "destructive",
			})
			console.error("Logout Error:", err)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex w-full">
				<div className="flex w-full max-w-full items-center justify-between gap-3 break-words border-b border-b-slate-500 p-2 hover:bg-secondary">
					<div className="flex items-center gap-3">
						<div className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-emerald-500 font-[700] text-white">
							<p>{initials}</p>
						</div>
						<div className="flex flex-col rounded-md p-2 text-left">
							<Badge className={`${getBadgeColour()} font-bold text-white`}>{user?.userType}</Badge>
							{user?.email}
						</div>
					</div>
					<MenuIcon className="ml-auto" />
				</div>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer">Open Settings</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer font-bold text-destructive" onClick={handleLogout}>
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuTrigger>
		</DropdownMenu>
	)
}
