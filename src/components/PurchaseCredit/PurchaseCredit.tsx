import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, CreditCard } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { PayPal } from "@/components/PayPal/PayPal"

const PurchaseAmount = () => {
	const [amountToPurchase, setAmountToPurchase] = useState(5.00)

	const incrementAmount = () => {
		setAmountToPurchase((prev) => prev + 5)
	}

	const decrementAmount = () => {
		setAmountToPurchase((prev) => Math.max(5, prev - 5)) // Minimum $5
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value)
		setAmountToPurchase(value)
	}

	return (
		<div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-green-50 to-sky-100 p-4">
			<Card className="w-full max-w-md rounded-md border border-slate-400 shadow-lg">
				<CardHeader className="rounded-t-md bg-gradient-to-r from-green-50 to-sky-50">
					<CardTitle className="text-2xl font-bold text-green-800">Purchase Amount</CardTitle>
					<CardDescription className="text-sky-700">Enter the value you want to purchase</CardDescription>
				</CardHeader>
				<CardContent className="p-6">
					<div className="mb-6 flex items-center justify-center space-x-4">
						<Button
							onClick={decrementAmount}
							className="h-6 w-10 rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
						>
							<Minus className="h-6 w-6" />
						</Button>
						<Input
							type="number"
							value={amountToPurchase}
							onChange={handleInputChange}
							className="ml-0 h-16 w-36 items-center text-center text-2xl font-bold text-green-800"
							min={5}
							step={5}
						/>
						<Button
							onClick={incrementAmount}
							className="h-6 w-10 rounded-full bg-green-500 p-2 text-white hover:bg-green-600"
						>
							<Plus className="h-6 w-6" />
						</Button>
					</div>
					<div className="text-center">
						<p className="text-lg font-semibold text-sky-700">Total Price</p>
						<p className="text-3xl font-bold text-green-800">${amountToPurchase.toFixed(2)}</p>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center rounded-b-md bg-gradient-to-r from-green-50 to-sky-50 p-6">
					<div className="w-full">
						<PayPal creditPurchaseValue={amountToPurchase} />
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

export default PurchaseAmount
