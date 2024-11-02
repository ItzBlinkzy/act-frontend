import { BellIcon, Settings, SparklesIcon, User, Users2 } from "lucide-react"
import UserItem from "@/components/Dashboard/UserItem"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { useLocation, useNavigate } from "react-router-dom"
import { Eye } from "lucide-react"
import useStore, { StoreModel } from "@/store/useStore"
export default function Sidebar() {
	const user = useStore((state: StoreModel) => state.user)
	const isFundManager = user?.userType === "Fund Manager"

	const location = useLocation()
	const navigate = useNavigate()
	const menuList = [
		{
			group: "General",
			items: [
				{
					route: "/dashboard",
					icon: <User />,
					text: "Profile",
					requiresFundManager: false,
				},
				{
					route: "/dashboard/clients",
					icon: <Users2 />,
					text: "Clients",
					requiresFundManager: true,
				},
				{
					route: "/dashboard/ai",
					icon: <SparklesIcon />,
					text: "Agentic AI",
					requiresFundManager: false,
				},
				{
					route: "/dashboard/notifications",
					icon: <BellIcon />,
					text: "Notifications",
					requiresFundManager: false,
				},
			],
		},
		{
			group: "Purchase Assets",
			items: [
				{
					route: "/dashboard/assets",
					icon: <Eye />,
					text: "Stocks & Crypto",
				},
			],
		},
		{
			group: "Settings",
			items: [
				{
					route: "/",
					icon: <Settings />,
					text: "General Settings",
				},
			],
		},
	]

	return (
		<div className="sticky flex min-h-screen w-[300px] min-w-[300px] flex-col gap-4 border-r border-slate-500 bg-gradient-to-tr from-green-200 to-sky-100">
			<div>
				<UserItem />
			</div>
			<div className="grow">
				<Command style={{ overflow: "visible", background: "transparent" }}>
					<CommandList style={{ overflow: "visible" }}>
						{menuList.map((menu: any, key: number) => (
							<CommandGroup key={key} heading={menu.group}>
								{menu.items.map((option: any, optionKey: number) => {
									if (!isFundManager && option.requiresFundManger) {
										return null
									}

									const isActive = location.pathname === option.route
									// skip any navigation options that require fund manager abilities unless they are a fund manager.
									if (option.requiresFundManager && user?.userType !== "Fund Manager") {
										return
									}

									return (
										<CommandItem
											key={optionKey}
											className={`flex cursor-pointer gap-2 ${isActive ? "bg-blue-400 opacity-90" : ""}`}
											onSelect={() => navigate(option.route)}
										>
											{option.icon}
											{option.text}
										</CommandItem>
									)
								})}
							</CommandGroup>
						))}
					</CommandList>
				</Command>
			</div>
		</div>
	)
}
