import { SiteHeader } from "@/components/site-header"
import { useRoutes } from "react-router-dom"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import Landing from "@/components/Landing/Landing"
import Login from "@/components/Login/Login"
import DashboardHome from "@/components/Dashboard/Home"
import Clients from "@/components/Dashboard/Clients/Clients"
import Ai from "@/components/Dashboard/agentic-ai/Ai"
import Protected from "./components/Protected"
import Notifications from "./components/Dashboard/Notifications/Notifications"
import { Toaster } from "./components/ui/toaster"
import ViewAssets from "./components/Assets/ViewAssets"
const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/login", element: <Login /> },
	{
		path: "/dashboard",
		element: (
			<Protected>
				<DashboardHome />
			</Protected>
		),
	},
	{
		path: "/dashboard/clients",
		element: (
			<Protected>
				<Clients />
			</Protected>
		),
	},
	{
		path: "/dashboard/ai",
		element: (
			<Protected>
				<Ai></Ai>
			</Protected>
		),
	},
	{
		path: "/dashboard/assets",
		element: (
			<Protected>
				<ViewAssets />
			</Protected>
		),
	},
	{
		path: "/dashboard/notifications",
		element: (
			<Protected>
				<Notifications />
			</Protected>
		),
	},
]

function Home() {
	return <Landing />
}

function App() {
	const children = useRoutes(routes)
	return (
		<>
			<div className="relative flex min-h-screen flex-col overflow-x-hidden">
				<SiteHeader />
				{children}
			</div>
			<div>
				<Toaster />
			</div>
			<TailwindIndicator />
		</>
	)
}

export default App
