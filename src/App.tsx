import { SiteHeader } from "@/components/site-header"
import { useRoutes } from "react-router-dom"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import Landing from "@/components/Landing/Landing"
import Login from "@/components/Login/Login"
import DashboardHome from "@/components/Dashboard/Home"
import Clients from "@/components/Dashboard/Clients/Clients"
import Ai from "@/components/Dashboard/agentic-ai/Ai"
import Notification from "@/components/Dashboard/Notifications/notifications"
const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/login", element: <Login /> },
	{ path: "/dashboard", element: <DashboardHome /> },
	{ path: "/dashboard/clients", element: <Clients /> },
	{ path: "/dashboard/ai", element: <Ai /> },
	{ path: "/dashboard/notifications", element: <Notification /> },
]

function Home() {
	return <Landing />
}

function App() {
	const children = useRoutes(routes)

	return (
		<>
			<div className="relative flex min-h-screen flex-col">
				<SiteHeader />
				<div className="flex-1">{children}</div>
			</div>
			<TailwindIndicator />
		</>
	)
}

export default App
