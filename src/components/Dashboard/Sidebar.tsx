import { BellIcon, Settings, SparklesIcon, User } from "lucide-react"
import UserItem from "@/components/Dashboard/UserItem"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { useLocation } from "react-router-dom"
export default function Sidebar() {
	const location = useLocation()
	const menuList = [
		{
			group: "General",
			items: [
				{
					route: "/dashboard",
					icon: <User />,
					text: "Profile",
				},
				{
					route: "/dashboard/clients",
					icon: <User />,
					text: "Clients",
				},
				{
					route: "/dashboard/ai",
					icon: <SparklesIcon />,
					text: "Agentic AI",
				},
				{
					route: "/dashboard/notifcations",
					icon: <BellIcon />,
					text: "Notifications",
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
		<div className="fixed flex min-h-screen w-[300px] min-w-[300px] flex-col gap-4 border-r p-4">
			<div>
				<UserItem />
			</div>
			<div className="grow">
				<Command style={{ overflow: "visible" }}>
					<CommandList style={{ overflow: "visible" }}>
						{menuList.map((menu: any, key: number) => (
							<CommandGroup key={key} heading={menu.group}>
								{menu.items.map((option: any, optionKey: number) => {
									const isActive = location.pathname === option.route
									console.log(location.pathname, option.route)
									return (
										<CommandItem
											key={optionKey}
											className={`flex cursor-pointer gap-2 ${isActive ? "bg-gray-300" : ""} hover:text-green-300`}
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
			<div>Settings / Notifications</div>
		</div>
	)
}
