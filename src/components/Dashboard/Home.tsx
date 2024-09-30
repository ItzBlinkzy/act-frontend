import Sidebar from "@/components/Dashboard/Sidebar"
import useStore from "@/store/useStore"

const DashboardHome = () => {
	const user = useStore((state) => state.user)
	return (
		<div className="flex h-full w-full">
			<Sidebar />
			<div className="p-2 text-3xl italic">
				Welcome, <span className="text-3xl font-bold">{user?.firstName}</span>
			</div>
		</div>
	)
}

export default DashboardHome
