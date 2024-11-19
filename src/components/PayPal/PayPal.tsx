import React, { useRef, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { baseApiUrl } from "@/config/constants"
import useStore, { UserInfo } from "@/store/useStore"
import { usePersistedStore } from "@/store/useStore"
import { StoreModel } from "@/store/useStore"
import { useNavigate } from "react-router-dom"
interface PayPalProps {
	creditPurchaseValue: number
}

// Extend the global window object to include PayPal types
declare global {
	interface Window {
		paypal: {
			Buttons: (options: {
				createOrder: (data: any, actions: any) => Promise<string>
				onApprove: (data: any, actions: any) => Promise<void>
				onError: (err: any) => void
			}) => {
				render: (element: HTMLDivElement) => void
			}
		}
	}
}

export function PayPal({ creditPurchaseValue }: PayPalProps): JSX.Element {
	const paypal = useRef<HTMLDivElement | null>(null)
	const user = useStore((state) => state.user)
	const navigate = useNavigate()
	const setUser = useStore((state: StoreModel) => state.setUser)

	useEffect(() => {
		if (!window.paypal) {
			console.error("PayPal SDK not loaded.")
			return
		}

		// Clean up any previously rendered PayPal button
		if (paypal.current && paypal.current.innerHTML) {
			paypal.current.innerHTML = ""
		}
		console.log({ creditPurchaseValue })

		window.paypal
			.Buttons({
				createOrder: (_, actions) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								description: "Credits for ACT App",
								amount: {
									currency_code: "EUR",
									value: creditPurchaseValue,
								},
							},
						],
					})
				},
				onApprove: async () => {
					// const order = await actions.order.capture()

					try {
						const response = await axios.post(
							`${baseApiUrl}/add-credit/${user?.id}?credit=${creditPurchaseValue}`,
							{},
							{ withCredentials: true },
						)
						const updatedCredit = (user?.credit || 0) + creditPurchaseValue

						if (response.status === 200) {
							setUser({
								...user, // Spread the current user object
								credit: updatedCredit, // Update only the credit field
							} as UserInfo)
							toast({
								title: "Purchase Successful",
								description: `You have purchased $${creditPurchaseValue?.toFixed(2)} credits.`,
								variant: "default",
							})
							navigate("/dashboard")
						}
					} catch (e: any) {
						console.log("Error with backend")
						console.log(e)
						toast({
							title: "Could not confirm purchase",
							description: `There was an error confirming your purchase in the backend. Try again later.`,
							variant: "destructive",
						})
					}
				},
				onError: (err) => {
					console.error(err)
				},
			})
			.render(paypal.current as HTMLDivElement)
	}, [creditPurchaseValue])

	return (
		<div>
			<div ref={paypal}></div>
		</div>
	)
}
