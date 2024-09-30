import Sidebar from "@/components/Dashboard/Sidebar"
import React from "react"
import Clients from "./Clients/Clients"
import useStore from "@/store/useStore"

const DashboardHome = () => {
	const store = useStore((state) => state)
	return (
		<div className="flex h-full w-full">
			<Sidebar />
			<div className="p-2 text-3xl italic">
				Welcome, <span className="text-3xl font-bold">{store.name}</span>
			</div>
		</div>
	)
}

export default DashboardHome
