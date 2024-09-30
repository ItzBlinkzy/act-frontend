import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BoxIcon } from "lucide-react"

const Login = () => {
<<<<<<< Updated upstream
=======
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const user = useStore((state: StoreModel) => state.user)
	const setUser = useStore((state: StoreModel) => state.setUser)

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
				// httpOnly cookie should be set at this point
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

>>>>>>> Stashed changes
	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto w-full max-w-md space-y-6">
				<div className="flex items-center justify-center">
					<Link to="/" className="flex items-center">
						<BoxIcon className="ml-2 text-2xl font-bold"></BoxIcon>
						{/* <MountainIcon className="h-8 w-8" /> */}
						<span className="ml-2 text-2xl font-bold">ACT App</span>
					</Link>
				</div>
				<Card>
					<CardHeader className="space-y-1 text-center">
						<CardTitle className="text-2xl">Sign in to your account</CardTitle>
						<CardDescription>Enter credentials to sign in to your account.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input id="username" placeholder="Enter your username" />
						</div>
						<div className="grid gap-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<Link to="/" className="text-sm text-primary hover:underline">
									Forgot password?
								</Link>
							</div>
							<Input id="password" type="password" placeholder="Enter your password" />
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Sign in
						</Button>
					</CardFooter>
				</Card>
				<div className="text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link to="/" className="font-medium text-primary hover:underline">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
