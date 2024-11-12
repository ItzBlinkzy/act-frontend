import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "@/components/Dashboard/Sidebar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserIcon } from "lucide-react"
import useStore from "@/store/useStore"
import axios from "axios"
import { baseAiUrl, baseApiUrl } from "@/config/constants"

interface Stock {
	ticker: string
	quantity_owned: string
	quantity_sold: string
	updated_at: string
	currentPrice?: number
	totalValue?: number
}

interface IClient {
	id: number
	company_name: string
	created_at: string
	updated_at: string
	deleted_at: Date | null
	totalAssets?: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"]

const Client = () => {
	const { clientId } = useParams<{ clientId: string }>()
	const [clientData, setClientData] = useState<IClient | null>(null)
	const [stocks, setStocks] = useState<Stock[]>([])
	const [loading, setLoading] = useState(true) // Loading state for spinner
	const user = useStore((state) => state.user)

	useEffect(() => {
		const fetchClientAndStocksData = async () => {
			setLoading(true) // Start loading
			const maxRetries = 3
			let retries = 0
			let success = false
			let delay = 1000

			while (!success && retries < maxRetries) {
				try {
					const response = await axios.get(`${baseApiUrl}/list-clients/${user?.id}`, { withCredentials: true })
					const clients = response.data

					const client = clients.find((c: any) => c.client.id === parseInt(clientId || ""))
					if (client) {
						setClientData(client.client)

						// Fetch current price for each stock and add it as a new attribute to each stock object
						const stocksWithPrices = await Promise.all(
							client.stocks.map(async (stock: Stock) => {
								try {
									const priceResponse = await axios.post(`${baseAiUrl}/api/search-stock-by-ticker`, {
										stock_ticker: stock.ticker,
									})

									const currentPrice = parseFloat(priceResponse.data.stock_data.currentPrice)
									const totalValue = currentPrice * parseFloat(stock.quantity_owned)

									return { ...stock, currentPrice, totalValue }
								} catch (priceError) {
									console.error(`Failed to fetch price for ${stock.ticker}`, priceError)
									return { ...stock, currentPrice: 0, totalValue: 0 }
								}
							}),
						)

						setStocks(stocksWithPrices)
					}
					success = true
				} catch (error) {
					retries += 1
					console.error(`Attempt ${retries} failed:`, error)
					if (retries < maxRetries) {
						await new Promise((resolve) => setTimeout(resolve, delay))
						delay *= 2
					} else {
						console.error("Max retries reached. Failed to fetch client and stock data.")
					}
				}
			}
			setLoading(false) // End loading
		}

		fetchClientAndStocksData()
	}, [user?.id, clientId])

	const totalPortfolioValue = stocks.reduce((total, stock) => total + (stock?.totalValue || 0), 0)

	const pieChartData = stocks.map((stock) => ({
		name: stock.ticker,
		value: stock.totalValue || 0,
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
							{clientData?.company_name ||
								(loading && (
									<div className="flex h-full w-full items-center justify-center">
										<LoadingSpinner />
									</div>
								))}
						</span>
					</CardTitle>
				</Card>
				<div className="grid w-full grid-cols-1 gap-6 p-4 md:grid-cols-2">
					<Card className="border shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Client Information</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							{loading ? (
								<div className="flex h-full w-full items-center justify-center">
									<LoadingSpinner />
								</div>
							) : (
								<p className="text-lg text-green-700">Total Assets: ${totalPortfolioValue.toLocaleString()}</p>
							)}
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
										label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
									>
										{pieChartData.map((_, index) => (
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
											<TableHead className="text-green-800">Quantity</TableHead>
											<TableHead className="text-green-800">Current Price</TableHead>
											<TableHead className="text-green-800">Total Value</TableHead>
											<TableHead className="text-green-800">% of Portfolio</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{loading ? (
											<TableRow>
												<TableCell colSpan={5} className="text-center">
													<div className="flex h-full w-full items-center justify-center">
														<LoadingSpinner />
													</div>
												</TableCell>
											</TableRow>
										) : (
											stocks.map((stock) => (
												<TableRow key={stock.ticker} className="font-bold hover:bg-sky-50">
													<TableCell className="font-medium text-black">{stock.ticker}</TableCell>
													<TableCell className="text-sky-600">{stock.quantity_owned}</TableCell>
													<TableCell className="text-sky-600">${stock.currentPrice?.toFixed(2)}</TableCell>
													<TableCell className="text-green-700 ">${stock.totalValue?.toFixed(2)}</TableCell>
													<TableCell className="text-green-700">
														{((stock.totalValue / totalPortfolioValue) * 100)?.toFixed(2)}%
													</TableCell>
												</TableRow>
											))
										)}
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
