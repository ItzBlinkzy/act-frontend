import { SiteHeader } from "@/components/site-header"
import { useRoutes } from "react-router-dom"
import { TailwindIndicator } from "./components/tailwind-indicator"
import Landing from "./components/Landing/Landing"
import Login from "./components/Login/Login"
const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/login", element: <Login /> },
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
