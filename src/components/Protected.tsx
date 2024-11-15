import React, { useState, useEffect } from "react"
import useStore, { StoreModel, usePersistedStore } from "@/store/useStore" // Import both stores
import { useNavigate } from "react-router-dom"
import { baseApiUrl } from "@/config/constants"
import axios from "axios"
import { supabase } from "@/supabaseClient"
import { LoadingSpinner } from "./ui/loading-spinner"
import { mapUserIDType } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface ProtectedProps {
	children: React.ReactNode
	fundManagerOnly?: boolean
}

const Protected: React.FC<ProtectedProps> = ({ children, fundManagerOnly = false }) => {
	const [authenticated, setAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true) // Loading state
	const navigate = useNavigate()

	// Zustand state and actions
	const setManagerClients = useStore((state: StoreModel) => state.setManagerClients)
	const user = useStore((state: StoreModel) => state.user)
	const setUser = useStore((state: StoreModel) => state.setUser)

	// Persisted Zustand state
	const usingSocialLogin = usePersistedStore((state) => state.usingSocialLogin)
	const setUsingSocialLogin = usePersistedStore((state) => state.setUsingSocialLogin)

	// Function to verify authentication for email/password users
	const verifyCookie = async (retryCount = 1) => {
		try {
			const response = await axios.get(`${baseApiUrl}/me`, { withCredentials: true })
			if (response.status === 200) {
				setUser({
					...user,
					id: response.data.user.id,
					email: response.data.user.email,
					firstName: response.data.user.first_name,
					lastName: response.data.user.last_name,
					userType: mapUserIDType(response.data.user.type_user_id) || null,
					credit: response.data.user.credit,
				})
				setUsingSocialLogin(false) // Explicitly set usingSocialLogin to false (persisted)
				setManagerClients(response.data.clients)
				setAuthenticated(true)
			} else {
				throw new Error("Unauthorized")
			}
		} catch (err: any) {
			if (retryCount < 3) {
				await verifyCookie(retryCount + 1)
			} else {
				navigate("/login")
				setAuthenticated(false)
			}
		} finally {
			setLoading(false)
		}
	}

	// Function to verify authentication for social login users
	const verifySupabaseSession = async () => {
		try {
			const { data: sessionData, error } = await supabase.auth.getSession()
			if (error || !sessionData?.session) throw new Error("Session not found")

			const userEmail = sessionData.session.user.email

			if (!userEmail) {
				console.log("Couldn't find user email")
				setAuthenticated(false)
				return
			}
			const { data: userData, error: fetchError } = await supabase
				.from("users")
				.select("*")
				.eq("email", userEmail)
				.single()
			if (fetchError || !userData) throw new Error("User not found")

			setUser({
				id: userData.id,
				email: userData.email,
				firstName: userData.first_name,
				lastName: userData.last_name,
				userType: mapUserIDType(userData.type_user_id),
				credit: userData.credit,
			})
			setUsingSocialLogin(true) // Explicitly set usingSocialLogin to true (persisted)
			setAuthenticated(true)
		} catch (error) {
			navigate("/login")
			setAuthenticated(false)
		} finally {
			setLoading(false)
		}
	}

	// Effect to determine the verification method
	useEffect(() => {
		console.log("Protected route checking:", usingSocialLogin) // Logs the persisted state
		console.log("User data currently", {
			user: useStore.getState().user,
			managerClients: useStore.getState().managerClients,
		})
		if (usingSocialLogin) {
			verifySupabaseSession()
		} else {
			verifyCookie()
		}
	}, [usingSocialLogin])

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
		toast({
			title: "Unauthorised",
			description: "Only fund managers can view this page.",
			variant: "default",
		})
		navigate("/dashboard")
		return null
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
