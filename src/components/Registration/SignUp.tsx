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
import { baseUrl } from "@/config/constants"
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
		if (formData.TypeUserId === 1) {
			return fundAdminClientTexts.administrator
		} else if (formData.TypeUserId === 2) {
			return fundAdminClientTexts.manager
		}
		return ""
	}

	const [formData, setFormData] = useState({
		FirstName: "",
		LastName: "",
		Email: "",
		Password: "",
		TypeUserId: 0, // typeUserId for account type
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setFormData({ ...formData, [id]: value })
	}

	const handleSelectChange = (value: string) => {
		setFormData({ ...formData, TypeUserId: parseInt(value, 10) })
	}

	const containsDigit = (str: string) => /\d/.test(str)
	const containsLetter = (str: string) => /[a-zA-Z]/.test(str)

	const validateForm = () => {
		let valid = true

		if (
			formData.FirstName.trim() === "" ||
			formData.LastName.trim() === "" ||
			formData.Email.trim() === "" ||
			formData.Password.trim() === "" ||
			formData.TypeUserId === 0
		) {
			toast({
				title: "Missing Information",
				description: "All fields are required",
				variant: "destructive",
			})
			valid = false
		}

		if (
			formData.Password.length < 6 ||
			formData.Password.length > 20 ||
			!containsDigit(formData.Password) ||
			!containsLetter(formData.Password)
		) {
			toast({
				title: "Invalid Password",
				description: "Password must be 6-20 characters long, include at least one letter and one number",
				variant: "destructive",
			})
			valid = false
		}

		if (!/\S+@\S+\.\S+/.test(formData.Email)) {
			toast({
				title: "Invalid Email",
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
				const response = await axios.post(`${baseUrl}/register-user`, formData, {
					headers: {
						Authorization: "", // Empty Authorization header or malformed jwt is returned
						"Content-Type": "application/json",
					},
					withCredentials: true,
				})

				if (response.status === 200) {
					toast({
						title: "Account Created",
						description: "Your account has been successfully created",
						variant: "default",
					})

					navigate(`/login?email=${formData.Email}`)
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
							<Label htmlFor="FirstName">First Name</Label>
							<Input id="FirstName" type="text" placeholder="John" value={formData.FirstName} onChange={handleChange} />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="LastName">Last Name</Label>
							<Input id="LastName" type="text" placeholder="Doe" value={formData.LastName} onChange={handleChange} />
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="Email">Email</Label>
						<Input
							id="Email"
							type="email"
							placeholder="john@email.com"
							value={formData.Email}
							onChange={handleChange}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="typeUserId">Account Type</Label>
						<Select onValueChange={handleSelectChange}>
							<SelectTrigger>
								{formData.TypeUserId === 1
									? "Fund Administrator"
									: formData.TypeUserId === 2
										? "Fund Manager"
										: "Select Account Type"}
							</SelectTrigger>
							{formData.TypeUserId !== 0 && (
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
						<Label htmlFor="Password">Password</Label>
						<Input id="Password" type="password" value={formData.Password} onChange={handleChange} />
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
