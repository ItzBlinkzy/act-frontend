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
import { baseApiUrl } from "@/config/constants"
import { useNavigate } from "react-router-dom"
import { LoadingSpinner } from "../ui/loading-spinner"

export default function SignUp() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const fundAdminClientTexts = {
		administrator: "A Fund Administrator manages their own assets",
		manager: "A Fund Manager manages assets for multiple clients",
	}
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		type_user_id: 0,
	})

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			handleSignUp()
		}
	}

	const getInfoText = (): string => {
		if (formData.type_user_id === 1) {
			return fundAdminClientTexts.administrator
		} else if (formData.type_user_id === 2) {
			return fundAdminClientTexts.manager
		}
		return ""
	}

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
				description: "Password must be 6-20 characters long, include at least one letter and one number",
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
			try {
				const response = await axios.post(`${baseApiUrl}/register-user`, formData, {
					withCredentials: true,
				})

				if (response.status === 200) {
					toast({
						title: "Account Created",
						description: "Your account has been successfully created",
						variant: "default",
					})

					navigate(`/login?email=${formData.email}`)
					return
				}
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
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-br from-green-100 to-sky-100 px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-2xl border-green-200 shadow-lg">
				<CardHeader className="space-y-1 bg-gradient-to-r from-green-200 to-sky-200">
					<CardTitle className="text-2xl font-bold text-green-800">Create a new account</CardTitle>
					<CardDescription className="text-sky-700">Enter your information to create an account.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 p-4 pt-6">
					<div className="flex w-full flex-col justify-start gap-4 sm:flex-row">
						<div className="grid w-full gap-2 sm:w-1/2">
							<Label htmlFor="first_name" className="text-green-700">
								First Name
							</Label>
							<Input
								id="first_name"
								type="text"
								placeholder="John"
								value={formData.first_name}
								onChange={handleChange}
								className="border-green-300 focus:border-green-500 focus:ring-green-500"
							/>
						</div>
						<div className="grid w-full gap-2 sm:w-1/2">
							<Label htmlFor="last_name" className="text-green-700">
								Last Name
							</Label>
							<Input
								id="last_name"
								type="text"
								placeholder="Doe"
								value={formData.last_name}
								onChange={handleChange}
								className="border-green-300 focus:border-green-500 focus:ring-green-500"
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							className="border-green-300 focus:border-green-500 focus:ring-green-500"
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
							<SelectTrigger className="border-green-300 focus:border-green-500 focus:ring-green-500">
								{formData.type_user_id === 1
									? "Fund Administrator"
									: formData.type_user_id === 2
										? "Fund Manager"
										: "Select Account Type"}
							</SelectTrigger>
							{formData.type_user_id !== 0 && (
								<SelectGroup className="flex">
									<InfoIcon className="text-sky-600" />
									<SelectLabel className="px-4 py-0 text-sm italic text-sky-700">{getInfoText()}</SelectLabel>
								</SelectGroup>
							)}
							<SelectContent>
								<SelectItem value="1">Fund Administrator</SelectItem>
								<SelectItem value="2">Fund Manager</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-2" onKeyDown={handleKeyDown}>
						<Label htmlFor="password" className="text-green-700">
							Password
						</Label>
						<Input
							id="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							className="border-green-300 focus:border-green-500 focus:ring-green-500"
						/>
					</div>
				</CardContent>
				<CardFooter className="p-4">
					<Button className="w-full bg-green-500 p-4 text-white hover:bg-green-600" onClick={handleSignUp}>
						{!loading && "Sign Up"}
						{loading && <LoadingSpinner />}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
