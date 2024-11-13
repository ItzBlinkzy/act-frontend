import { supabase } from "@/supabaseClient"
import { User, Session } from "@supabase/supabase-js" // Import necessary types

// Function to handle Google login
const handleGoogleLogin = async (): Promise<void> => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
	})

	if (error) {
		console.error("Google login failed:", error.message)
	} else {
		console.log("Google login successful")

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

// Function to handle GitHub login
const handleGithubLogin = async (): Promise<void> => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
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
