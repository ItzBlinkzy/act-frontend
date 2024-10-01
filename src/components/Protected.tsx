import React, { useState, useEffect } from "react"
import useStore, { StoreModel } from "@/store/useStore"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "@/config/constants"
import axios from "axios"
import { LoadingSpinner } from "./ui/loading-spinner"

interface ProtectedProps {
	children: React.ReactNode
}
const Protected: React.FC<ProtectedProps> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true) // Loading state
	const user = useStore((state: StoreModel) => state.user)
	const setUser = useStore((state: StoreModel) => state.setUser)
	const navigate = useNavigate()

	useEffect(() => {
		const verifyCookie = async () => {
			try {
				const response = await axios.get(`${baseUrl}/me`, { withCredentials: true })
				console.log(response.data)
				if (response.status === 200) {
					if (!user?.email) {
						setUser({
							...user,
							email: response.data.email,
							firstName: response.data.first_name,
							lastName: response.data.last_name,
						})
					}
					setAuthenticated(true)
				} else {
					navigate("/login")
					setAuthenticated(false)
				}
			} catch (err: any) {
				navigate("/login")
				setAuthenticated(false)
			} finally {
				setLoading(false) // Finish loading
			}
		}

		verifyCookie()
	}, [user, setUser, navigate])

	// Loading or unauthorized
	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<LoadingSpinner className="h-10 w-10" />
			</div>
		)
	}

	// Only render children when authenticated
	return authenticated ? <>{children}</> : null
}

export default Protected
