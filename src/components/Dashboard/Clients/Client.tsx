import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "@/components/Dashboard/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserIcon } from "lucide-react"
import useStore from "@/store/useStore"

interface Stock {
	symbol: string
	name: string
	quantity: number
	averagePrice: number
	currentPrice: number
	totalValue: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"]

const Client = () => {
	const { clientId } = useParams<{ clientId: string }>()
	const [clientData, setClientData] = useState<any>(null)
	const [stocks, setStocks] = useState<Stock[]>([])
	const user = useStore((state) => state.user)

	useEffect(() => {
		// Simulated API call to fetch client data
		const fetchClientData = async () => {
			// Replace this with actual API call
			const mockClientData = {
				id: clientId,
				name: "John Doe",
				email: "john.doe@example.com",
				totalAssets: 1000000,
			}
			setClientData(mockClientData)
		}

		// Simulated API call to fetch stocks data
		const fetchStocksData = async () => {
			// Replace this with actual API call
			const mockStocks: Stock[] = [
				{ symbol: "AAPL", name: "Apple Inc.", quantity: 100, averagePrice: 150, currentPrice: 155, totalValue: 15500 },
				{
					symbol: "GOOGL",
					name: "Alphabet Inc.",
					quantity: 50,
					averagePrice: 2500,
					currentPrice: 2600,
					totalValue: 130000,
				},
				{
					symbol: "MSFT",
					name: "Microsoft Corporation",
					quantity: 75,
					averagePrice: 300,
					currentPrice: 310,
					totalValue: 23250,
				},
				{
					symbol: "AMZN",
					name: "Amazon.com Inc.",
					quantity: 30,
					averagePrice: 3300,
					currentPrice: 3400,
					totalValue: 102000,
				},
				{ symbol: "TSLA", name: "Tesla Inc.", quantity: 40, averagePrice: 700, currentPrice: 720, totalValue: 28800 },
			]
			setStocks(mockStocks)
		}

		fetchClientData()
		fetchStocksData()
	}, [clientId])

	const totalPortfolioValue = stocks.reduce((total, stock) => total + stock.totalValue, 0)

	const pieChartData = stocks.map((stock) => ({
		name: stock.symbol,
		value: stock.totalValue,
	}))

	return (
		<div className="flex h-full w-full bg-gradient-to-br from-green-50 to-sky-100">
			<Sidebar />
			<div className="flex w-full flex-col">
				<Card className="m-4 border p-0 shadow-lg">
					<div className="mt-4 border-b border-b-slate-400 p-2">
						<UserIcon className="h-8 w-8 text-green-600" />
					</div>
					<CardTitle className="p-4 text-3xl font-normal text-green-800">
						Client Profile:{" "}
						<span className="animate-gradient bg-gradient-to-r from-blue-800 to-sky-400 bg-clip-text text-4xl font-bold text-transparent">
							{clientData?.name}
						</span>
					</CardTitle>
				</Card>
				<div className="grid w-full grid-cols-1 gap-6 p-4 md:grid-cols-2">
					<Card className="border shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Client Information</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<p className="text-lg text-sky-600">Email: {clientData?.email}</p>
							<p className="text-lg text-green-700">Total Assets: ${clientData?.totalAssets.toLocaleString()}</p>
						</CardContent>
					</Card>
					<Card className="border shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Stock Allocation</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={pieChartData}
										cx="50%"
										cy="50%"
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
										label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
									>
										{pieChartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
					<Card className="border shadow-lg md:col-span-2">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Stock Holdings</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<ScrollArea className="h-[400px]">
								<Table>
									<TableHeader>
										<TableRow className="bg-green-100">
											<TableHead className="text-green-800">Symbol</TableHead>
											<TableHead className="text-green-800">Name</TableHead>
											<TableHead className="text-green-800">Quantity</TableHead>
											<TableHead className="text-green-800">Avg. Price</TableHead>
											<TableHead className="text-green-800">Current Price</TableHead>
											<TableHead className="text-green-800">Total Value</TableHead>
											<TableHead className="text-green-800">% of Portfolio</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{stocks.map((stock) => (
											<TableRow key={stock.symbol} className="hover:bg-sky-50">
												<TableCell className="font-medium text-black">{stock.symbol}</TableCell>
												<TableCell className="text-sky-600">{stock.name}</TableCell>
												<TableCell className="text-sky-600">{stock.quantity}</TableCell>
												<TableCell className="text-sky-600">${stock.averagePrice.toFixed(2)}</TableCell>
												<TableCell className="text-sky-600">${stock.currentPrice.toFixed(2)}</TableCell>
												<TableCell className="text-green-700">${stock.totalValue.toLocaleString()}</TableCell>
												<TableCell className="text-green-700">
													{((stock.totalValue / totalPortfolioValue) * 100).toFixed(2)}%
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Client
