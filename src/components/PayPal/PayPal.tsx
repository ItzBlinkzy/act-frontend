import React, { useRef, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { baseApiUrl } from "@/config/constants"
import useStore from "@/store/useStore"
import { usePersistedStore } from "@/store/useStore"
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
  const setUser = useStore((state) => state.setUser)
	const navigate = useNavigate()
	const usingSocialLogin = usePersistedStore((state) => state.usingSocialLogin)
	const setUsingSocialLogin = usePersistedStore((state) => state.setUsingSocialLogin)


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

						if (response.status === 200) {
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
