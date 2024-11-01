import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import useStore, { StoreModel } from "@/store/useStore"
import { baseApiUrl } from "@/config/constants"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { LoadingSpinner } from "../ui/loading-spinner"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const setManagerClients = useStore((state: StoreModel) => state.setManagerClients)

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			handleLogin()
		}
	}

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value)
	}

	const handleLogin = async () => {
		setLoading(true)
		try {
			const response = await axios.post(`${baseApiUrl}/login`, { email, password }, { withCredentials: true })
			if (response.status === 200) {
				navigate("/dashboard")
				setManagerClients(response.data.clients)
			}
		} catch (err: any) {
			if (err.response?.status === 401) {
				toast({
					title: "Login Failed",
					description: "Incorrect username or password",
					variant: "destructive",
				})
			} else {
				toast({
					title: "Internal Server Error",
					description: "There was an issue with the server. Try again later.",
					variant: "destructive",
				})
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-br from-green-100 to-sky-100 px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md border-green-200 shadow-lg">
				<CardHeader className="space-y-1 bg-gradient-to-r from-green-200 to-sky-200">
					<CardTitle className="text-2xl font-bold text-green-800">Sign in to your account</CardTitle>
					<CardDescription className="font-bold text-sky-700">Login with Google or GitHub</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 p-4 pt-6">
					<div className="grid grid-cols-2 gap-6">
						<Button variant="outline" className="border-green-300 bg-white text-gray-700 hover:bg-gray-100">
							<FaGithub className="mr-2 h-6 w-6" />
							Github
						</Button>
						<Button variant="outline" className="border-green-300 bg-white text-gray-700 hover:bg-gray-100">
							<FcGoogle className="mr-2 h-6 w-6" />
							Google
						</Button>
					</div>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-white px-2 text-gray-700">Or continue with</span>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email" className="text-green-700">
							Email
						</Label>
						<Input
							id="email"
							placeholder="Enter your email"
							onChange={handleEmailChange}
							className="border-green-300 focus:border-green-500 focus:ring-green-500"
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password" className="text-green-700">
								Password
							</Label>
							<Link to="/" className="text-sm text-sky-600 hover:underline">
								Forgot password?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							placeholder="Enter your password"
							onKeyDown={handleKeyDown}
							onChange={handlePasswordChange}
							className="border-green-300 focus:border-green-500 focus:ring-green-500"
						/>
					</div>
					<Button
						type="submit"
						className="w-full bg-green-500 p-4 text-white hover:bg-green-600"
						onClick={handleLogin}
						disabled={loading}
					>
						{!loading && "Sign In"}
						{loading && <LoadingSpinner />}
					</Button>
				</CardContent>
			</Card>
			<div className="pt-4 text-center text-sm text-sky-700">
				Don&apos;t have an account?{" "}
				<Link to="/sign-up" className="font-medium text-green-600 hover:underline">
					Sign up
				</Link>
			</div>
		</div>
	)
}

export default Login
