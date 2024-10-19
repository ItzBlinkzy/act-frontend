// import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { InfoIcon } from "lucide-react"
import { SelectGroup, SelectLabel } from "@radix-ui/react-select"
import axios from "axios"
import { baseAPIURL } from "@/config/constants"
import { useNavigate } from "react-router-dom"
import { LoadingSpinner } from "../ui/loading-spinner"
export default function SignUp() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			handleSignUp()
		}
	}
	const fundAdminClientTexts = {
		administrator: "A Fund Administrator manages their own assets",
		manager: "A Fund Manager manages assets for multiple clients",
	}
	const getInfoText = (): string => {
		if (formData.type_user_id === 1) {
			return fundAdminClientTexts.administrator
		} else if (formData.type_user_id === 2) {
			return fundAdminClientTexts.manager
		}
		return ""
	}

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		type_user_id: 0, // type_user_id for account type
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setFormData({ ...formData, [id]: value })
	}

	const handleSelectChange = (value: string) => {
		setFormData({ ...formData, type_user_id: parseInt(value, 10) })
	}

	const containsDigit = (str: string) => /\d/.test(str)
	const containsLetter = (str: string) => /[a-zA-Z]/.test(str)

	const validateForm = () => {
		let valid = true

		if (
			formData.first_name.trim() === "" ||
			formData.last_name.trim() === "" ||
			formData.email.trim() === "" ||
			formData.password.trim() === "" ||
			formData.type_user_id === 0
		) {
			toast({
				title: "Missing Information",
				description: "All fields are required",
				variant: "destructive",
			})
			valid = false
		}

		if (
			formData.password.length < 6 ||
			formData.password.length > 20 ||
			!containsDigit(formData.password) ||
			!containsLetter(formData.password)
		) {
			toast({
				title: "Invalid password",
				description: "password must be 6-20 characters long, include at least one letter and one number",
				variant: "destructive",
			})
			valid = false
		}

		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			toast({
				title: "Invalid email",
				description: "Please enter a valid email address",
				variant: "destructive",
			})
			valid = false
		}

		return valid
	}

	const handleSignUp = async () => {
		setLoading(true)
		if (validateForm()) {
			// Proceed with form submission
			console.log("Form data:", formData)

			try {
				const response = await axios.post(`${baseAPIURL}/register-user`, formData, {
					withCredentials: true,
				})

				if (response.status === 200) {
					toast({
						title: "Account Created",
						description: "Your account has been successfully created",
						variant: "default",
					})

					navigate(`/login?email=${formData.email}`)
					setLoading(false)
					return
				}

				setLoading(false)
			} catch (e: any) {
				toast({
					title: "Internal Server Error",
					description: "There was an issue creating your account. Please try again later.",
					variant: "default",
				})
			} finally {
				setLoading(false)
			}
		}
		setLoading(false)
	}

	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-[60%]">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Create a new account</CardTitle>
					<CardDescription>Enter your information to create an account.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="flex w-full flex-col justify-between gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first_name">First Name</Label>
							<Input
								id="first_name"
								type="text"
								placeholder="John"
								value={formData.first_name}
								onChange={handleChange}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last_name">Last Name</Label>
							<Input id="last_name" type="text" placeholder="Doe" value={formData.last_name} onChange={handleChange} />
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="john@email.com"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="type_user_id">Account Type</Label>
						<Select onValueChange={handleSelectChange}>
							<SelectTrigger>
								{formData.type_user_id === 1
									? "Fund Administrator"
									: formData.type_user_id === 2
										? "Fund Manager"
										: "Select Account Type"}
							</SelectTrigger>
							{formData.type_user_id !== 0 && (
								<SelectGroup className="flex">
									<InfoIcon className="text-muted-foreground" />
									<SelectLabel className="px-4 py-0 text-sm italic text-muted-foreground">{getInfoText()}</SelectLabel>
								</SelectGroup>
							)}
							<SelectContent>
								<SelectItem value="1">Fund Administrator</SelectItem>
								<SelectItem value="2">Fund Manager</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2" onKeyDown={handleKeyDown}>
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" value={formData.password} onChange={handleChange} />
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full" onClick={handleSignUp}>
						{!loading && "Sign In"}
						{loading && <LoadingSpinner />}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
