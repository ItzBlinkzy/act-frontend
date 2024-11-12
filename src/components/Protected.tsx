import React, { useState, useEffect } from "react"
import useStore, { StoreModel } from "@/store/useStore"
import { useNavigate } from "react-router-dom"
import { baseApiUrl } from "@/config/constants"
import axios from "axios"
import { LoadingSpinner } from "./ui/loading-spinner"
import { mapUserIDType } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
interface ProtectedProps {
	children: React.ReactNode
	fundManagerOnly?: boolean
}
const Protected: React.FC<ProtectedProps> = ({ children, fundManagerOnly = false }) => {
	const [authenticated, setAuthenticated] = useState(false)
	const setManagerClients = useStore((state) => state.setManagerClients)
	const [loading, setLoading] = useState(true) // Loading state
	const user = useStore((state: StoreModel) => state.user)
	const setUser = useStore((state: StoreModel) => state.setUser)
	const navigate = useNavigate()

	useEffect(() => {
		const verifyCookie = async (retryCount = 1) => {
			try {
				const response = await axios.get(`${baseApiUrl}/me`, { withCredentials: true })
				console.log(response.data)
				if (response.status === 200) {
					if (!user?.email) {
						setUser({
							...user,
							id: response.data.user.id,
							email: response.data.user.email,
							firstName: response.data.user.first_name,
							lastName: response.data.user.last_name,
							userType: mapUserIDType(response.data.user.type_user_id) || null,
						})
					}
					setManagerClients(response.data.clients)
					setAuthenticated(true)
				} else {
					throw new Error("Unauthorized")
				}
			} catch (err: any) {
				if (retryCount < 3) {
					// Retry up to 2 more times
					await verifyCookie(retryCount + 1)
				} else {
					toast({
						title: "ERROR PROTECTED ROUTE",
						description: "Should be logged out.",
						variant: "destructive",
					})
					console.log(err)
					navigate("/login")
					setAuthenticated(false)
				}
			} finally {
				setLoading(false) // Finish loading
			}
		}
		verifyCookie()
	}, [])

	// Loading or unauthorized
	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<LoadingSpinner className="h-10 w-10" />
			</div>
		)
	}

	// Fund manager only view
	if (fundManagerOnly) {
		if (user?.userType === "Fund Manager" && authenticated) {
			return <>{children}</>
		}
		// redirect
		toast({
			title: "Unauthorised",
			description: "Only fund managers can view this page.",
			variant: "default",
		})

		navigate("/dashboard")
		return
	}

	// General authenticated view
	return authenticated ? (
		<>{children}</>
	) : (
		<div className="flex h-screen w-full items-center justify-center">
			<p className="text-red-600">You are not authenticated.</p>
		</div>
	)
}

export default Protected
