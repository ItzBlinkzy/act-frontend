import React, { useState, useEffect } from "react"
import useStore, { StoreModel } from "@/store/useStore"
import { useNavigate } from "react-router-dom"
import { baseAPIURL } from "@/config/constants"
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
	const [loading, setLoading] = useState(true) // Loading state
	const user = useStore((state: StoreModel) => state.user)
	const setUser = useStore((state: StoreModel) => state.setUser)
	const navigate = useNavigate()

	useEffect(() => {
    const verifyCookie = async (retryCount = 1) => {
      try {
          const response = await axios.get(`${baseAPIURL}/me`, { withCredentials: true });
          console.log(response.data);
          if (response.status === 200) {
              if (!user?.email) {
                  setUser({
                      ...user,
                      id: response.data.id,
                      email: response.data.email,
                      firstName: response.data.first_name,
                      lastName: response.data.last_name,
                      userType: mapUserIDType(response.data.type_user_id) || null,
                  });
              }
              setAuthenticated(true);
          } else {
              throw new Error('Unauthorized');
          }
      } catch (err: any) {
          if (retryCount < 3) {
              // Retry up to 2 more times
              await verifyCookie(retryCount + 1);
          } else {
              toast({
                  title: "ERROR PROTECTED ROUTE",
                  description: "Should be logged out.",
                  variant: "destructive",
              });
              console.log(err);
              navigate("/login");
              setAuthenticated(false);
          }
      } finally {
          setLoading(false); // Finish loading
      }
  };
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
