import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { baseUrl } from "@/config/constants"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { LoadingSpinner } from "../ui/loading-spinner"
import { LucideGithub } from "lucide-react"
import { useLocation } from "react-router-dom"
const Login = () => {
	const navigate = useNavigate()
	const location = useLocation()

	// Function to extract query parameters from the URL
	const getQueryParams = (search: string) => {
		const params = new URLSearchParams(search)
		return {
			email: params.get("email"),
		}
	}

	const queryParams = getQueryParams(location.search)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			handleLogin()
		}
	}

	const handleEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
		event.preventDefault()
		const target = event.target as HTMLInputElement
		const val = target.value

		setEmail(val)
	}

	const handlePasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
		event.preventDefault()
		const target = event.target as HTMLInputElement
		const val = target.value

		setPassword(val)
	}

	const handleLogin = async () => {
		setLoading(true)
		try {
			const response = await axios.post(`${baseUrl}/login`, { email, password }, { withCredentials: true })
			console.log(response.status)
			if (response.status === 200) {
				// http only should be set here
				navigate("/dashboard")
			}
		} catch (err: any) {
			if (err.response.status === 401) {
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
		<div>
			<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
				<Card className="w-1/2">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl">Sign in to your account</CardTitle>
						<CardDescription>Login with Google or GitHub</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid grid-cols-2 gap-6">
							<Button variant="outline">
								<LucideGithub className="mr-2 h-4 w-4" />
								Github
							</Button>
							<Button variant="outline">
								{/* <Icons.google className="mr-2 h-4 w-4" /> */}
								Google
							</Button>
						</div>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="Enter your email"
								onChange={handleEmailChange}
								defaultValue={queryParams.email || ""}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<Link to="/" className="text-sm text-primary hover:underline">
									Forgot password?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								onKeyDown={handleKeyDown}
								onChange={handlePasswordChange}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full" onClick={handleLogin} disabled={loading}>
							{!loading && "Sign In"}
							{loading && <LoadingSpinner />}
						</Button>
					</CardFooter>
				</Card>
				<div className="pt-4 text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link to="/sign-up" className="font-medium text-primary hover:underline">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
