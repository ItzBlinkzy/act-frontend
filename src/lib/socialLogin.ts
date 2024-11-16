import { supabase } from "@/supabaseClient"
import { toast } from "@/hooks/use-toast"
import { mapUserIDType } from "@/lib/utils"
import { usePersistedStore } from "@/store/useStore"
import { UserInfo } from "@/store/useStore"

const redirectUrl =
	process.env.CURRENT_ENV === "production"
		? "https://act-frontend.netlify.app/dashboard"
		: "http://localhost:5173/dashboard"

const handleGoogleLogin = async (
	setUser: (user: UserInfo) => void,
	navigate: (path: string) => void,
): Promise<void> => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: redirectUrl },
		})
		if (error) {
			throw new Error(`Google login failed: ${error.message}`)
		}

		// Retrieve the user session data
		const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
		if (sessionError || !sessionData?.session?.user) {
			throw new Error("Failed to retrieve session or user data")
		}

		// Extract user email
		const userEmail = sessionData.session.user.email
		if (!userEmail) {
			throw new Error("User email not found in session")
		}

		// Fetch user data from the database
		const { data: userData, error: fetchError } = await supabase
			.from("users")
			.select("*")
			.eq("email", userEmail)
			.single()
		if (fetchError || !userData) {
			throw new Error("User not found in database")
		}

		console.log("Google login successful, direct user data from supabase below.")
		console.log("Session Data:", JSON.stringify(userData, null, 2))

		// Update global state
		setUser({
			id: userData.id,
			email: userData.email,
			firstName: userData.first_name,
			lastName: userData.last_name,
			userType: mapUserIDType(userData.type_user_id),
			credit: userData.credit,
		})

		// Persist social login state
		const { setUsingSocialLogin } = usePersistedStore.getState()
		setUsingSocialLogin(true) // Mark as a social login

		// Navigate to the dashboard or any post-login route
		navigate("/dashboard")

		console.log("User successfully logged in and state updated")
	} catch (err: any) {
		console.error("Error during Google login:", err.message)
		toast({
			title: "Login failed",
			description: err.message || "An error occurred during Google login.",
			variant: "destructive",
		})
	}
}

export default handleGoogleLogin

// Function to handle GitHub login
const handleGithubLogin = async (): Promise<void> => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: { redirectTo: redirectUrl },
	})

	if (error) {
		console.error("GitHub login failed:", error.message)
	} else {
		console.log("GitHub login successful")

		// Access user session data
		const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
		if (sessionError) {
			console.error("Failed to retrieve session:", sessionError.message)
		} else if (sessionData?.session?.user) {
			console.log("Logged in user email:", sessionData.session.user.email) // This logs the user's email
			// Do something with the email, like updating state or navigating
		}
	}
}

// Function to get the logged-in user's email after social login
const getSocialLoginEmail = async (): Promise<void> => {
	const { data, error } = await supabase.auth.getSession()

	if (error) {
		console.error("Failed to retrieve session:", error.message)
	} else if (data?.session?.user) {
		console.log("User email:", data.session.user.email) // Use data.session.user.email as needed
	} else {
		console.log("No user logged in")
	}
}

export { handleGoogleLogin, getSocialLoginEmail, handleGithubLogin }
