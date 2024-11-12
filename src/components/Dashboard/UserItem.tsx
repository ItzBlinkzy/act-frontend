import React from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { baseApiUrl } from "@/config/constants"
import axios from "axios"
import useStore, { StoreModel } from "@/store/useStore"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { MenuIcon } from "lucide-react"
export default function UserItem() {
	const navigate = useNavigate()
	const user = useStore((state: StoreModel) => state.user)
	let initials = "??"
	if (user?.firstName?.length || user?.lastName?.length) {
		initials = (user.firstName[0] + user.lastName[0]).toLocaleUpperCase()
	}
	const getBadgeColour = (): string => {
		if (user?.userType === "Fund Manager") return "bg-orange-400"
		return "bg-blue-600"
	}
	const handleLogout = async () => {
		try {
			const response = await axios.post(`${baseApiUrl}/logout`, {}, { withCredentials: true })
			if (response.status === 200) {
				navigate("/login")
				toast({
					title: "Signed Out Successfully",
					description: "You have been signed out of your account.",
					variant: "default",
				})
			}
		} catch (err: any) {
			toast({
				title: "Internal Server Error ",
				description: "Could not log you out. Please try again later",
				variant: "destructive",
			})
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
