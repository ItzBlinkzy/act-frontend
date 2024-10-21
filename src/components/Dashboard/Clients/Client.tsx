import React from "react"
import Sidebar from "../Sidebar"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableHeader, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useEffect } from "react"
import { baseAPIURL } from "@/config/constants"
import axios from "axios"

interface Stock {
	symbol: string
	name: string
	quantity: number
	currentPrice: number
	totalValue: number
	change: number
}
interface IClient {
	id: string
	company_name: string
	created_at: string
	updated_at: string
	deleted_at: Date | null
}
const performanceData = [
	{ month: "Jan", value: 4000 },
	{ month: "Feb", value: 3000 },
	{ month: "Mar", value: 5000 },
	{ month: "Apr", value: 4500 },
	{ month: "May", value: 6000 },
	{ month: "Jun", value: 5500 },
]

const assetAllocationData = [
	{ name: "Stocks", value: 70 },
	{ name: "Bonds", value: 20 },
	{ name: "Cash", value: 10 },
]

const Client = () => {
	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
	const [currentClients, setCurrentClients] = useState<IClient | null>()

	useEffect(() => {
		const getClientStockData = async () => {
			const response = await axios.get(`${baseAPIURL}/`)
		}

		// get list of all currentClients

		// client.foreach
	})

	const handleRemoveClient = () => {}
	const handleAddStock = () => {}

	// Individual client page.
	return (
		<>
			<div className="flex">
				<Sidebar />
			</div>
			<div className="container mx-auto p-4">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-2xl font-bold">Client: MYCLIENTNAME</h1>
					<Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
						<DialogTrigger asChild>
							<Button variant="destructive">
								<Trash className="mr-2 h-4 w-4" />
								Remove Client
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you sure you want to remove this client?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will permanently delete the client's account and remove all of
									their data from our servers.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsRemoveDialogOpen(false)}>
									Cancel
								</Button>
								<Button variant="destructive" onClick={handleRemoveClient}>
									Remove Client
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Client Information</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<strong>Email:</strong> clientemail
							</p>
							<p>
								<strong>Total Assets:</strong> client.totalassets??
							</p>
							<p>
								<strong>YTD Performance:</strong> clientperformancemetrics%
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Performance</CardTitle>
						</CardHeader>
						<CardContent>
							{/* <ResponsiveContainer width="100%" height={200}>
								<LineChart data={performanceData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line type="monotone" dataKey="value" stroke="#8884d8" />
								</LineChart>
							</ResponsiveContainer> */}
						</CardContent>
					</Card>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Asset Allocation</CardTitle>
					</CardHeader>
					<CardContent>
						{/* <ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={assetAllocationData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
								>
									{assetAllocationData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer> */}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Stock Holdings</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHeader>Symbol</TableHeader>
									<TableHeader>Name</TableHeader>
									<TableHeader>Quantity</TableHeader>
									<TableHeader>Current Price</TableHeader>
									<TableHeader>Total Value</TableHeader>
									<TableHeader>Change</TableHeader>
								</TableRow>
							</TableHeader>
							<TableBody>
								{stocks.map((stock) => (
									<TableRow key={stock.symbol}>
										<TableCell className="font-medium">{stock.symbol}</TableCell>
										<TableCell>{stock.name}</TableCell>
										<TableCell>{stock.quantity}</TableCell>
										<TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
										<TableCell>${stock.totalValue.toFixed(2)}</TableCell>
										<TableCell className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
											{stock.change >= 0 ? "+" : ""}
											{stock.change.toFixed(2)}%
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						<form onSubmit={handleAddStock} className="mt-4 flex items-end space-x-2">
							<div>
								<label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
									Symbol
								</label>
								<Input
									id="symbol"
									value={newStock.symbol}
									onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
									required
								/>
							</div>
							<div>
								<label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
									Quantity
								</label>
								<Input
									id="quantity"
									type="number"
									value={newStock.quantity}
									onChange={(e) => setNewStock({ ...newStock, quantity: parseInt(e.target.value) })}
									required
									min="1"
								/>
							</div>
							<Button type="submit">
								<Plus className="mr-2 h-4 w-4" />
								Add Stock
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default Client
