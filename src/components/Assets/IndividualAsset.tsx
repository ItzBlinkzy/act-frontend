import React, { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import ApexCharts from "react-apexcharts"
import Sidebar from "@/components/Dashboard/Sidebar"
import axios from "axios"
import { baseAiUrl } from "@/config/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Client {
	id: string
	name: string
	ownedAssets: { [ticker: string]: number }
}

const IndividualAsset = () => {
	const params = useParams()
	const ticker = params?.ticker

	const [historicalData, setHistoricalData] = useState([])
	const [companyData, setCompanyData] = useState({})
	const [clients, setClients] = useState<Client[]>([])
	const [selectedClient, setSelectedClient] = useState<string | null>(null)
	const [quantity, setQuantity] = useState(1)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy")
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const getStockHistory = async () => {
			const response = await axios.post(`${baseAiUrl}/api/search-stock-by-ticker`, { stock_ticker: ticker })
			setHistoricalData(response.data.historical_data)
			setCompanyData({ ...response.data.stock_data, company_name: response.data.company_name })
		}
		getStockHistory()

		// Fetch clients data (replace with actual API call)
		const fetchClients = async () => {
			// Simulated API call
			const response = await new Promise<Client[]>((resolve) =>
				setTimeout(
					() =>
						resolve([
							{ id: "1", name: "John Doe", ownedAssets: { [ticker]: 10 } },
							{ id: "2", name: "Jane Smith", ownedAssets: { [ticker]: 5 } },
							{ id: "3", name: "Bob Johnson", ownedAssets: {} },
						]),
					1000,
				),
			)
			setClients(response)
		}
		fetchClients()
	}, [ticker])

	const limitedHistoricalData = useMemo(() => historicalData.slice(-200), [historicalData])

	const candlestickSeries = useMemo(
		() => [
			{
				data: limitedHistoricalData.map((data) => ({
					x: new Date(data.Date),
					y: [
						parseFloat(data.Open.toFixed(2)),
						parseFloat(data.High.toFixed(2)),
						parseFloat(data.Low.toFixed(2)),
						parseFloat(data.Close.toFixed(2)),
					],
				})),
			},
		],
		[limitedHistoricalData],
	)

	const chartOptions = useMemo(
		() => ({
			chart: {
				type: "candlestick",
				height: 350,
				id: "candlestick-chart",
				zoom: { enabled: true, autoScaleYaxis: true },
				toolbar: {
					autoSelected: "zoom",
					tools: {
						zoomin: true,
						zoomout: true,
						pan: true,
						reset: true,
					},
				},
			},
			xaxis: { type: "datetime" },
			yaxis: { tooltip: { enabled: true } },
		}),
		[ticker],
	)

	const handleTransaction = async () => {
		if (!selectedClient) {
			toast({
				title: "Error",
				description: "Please select a client.",
				variant: "destructive",
			})
			return
		}

		try {
			// Simulated API call for transaction
			await new Promise((resolve) => setTimeout(resolve, 1000))

			// Update client's owned assets (in a real app, this would be done on the server)
			setClients((prevClients) =>
				prevClients.map((client) =>
					client.id === selectedClient
						? {
								...client,
								ownedAssets: {
									...client.ownedAssets,
									[ticker]: (client.ownedAssets[ticker] || 0) + (transactionType === "buy" ? quantity : -quantity),
								},
							}
						: client,
				),
			)

			toast({
				title: "Transaction Successful",
				description: `Successfully ${
					transactionType === "buy" ? "bought" : "sold"
				} ${quantity} shares of ${ticker} for ${clients.find((c) => c.id === selectedClient)?.name}.`,
			})
			setIsDialogOpen(false)
		} catch (error) {
			console.error("Transaction failed:", error)
			toast({
				title: "Transaction Failed",
				description: "An error occurred while processing the transaction.",
				variant: "destructive",
			})
		}
	}

	return (
		<div className="flex h-full w-full bg-gradient-to-br from-green-200 to-sky-100">
			<Sidebar />
			<div className="w-full p-4">
				<Card className="m-4 border-green-200 p-0 shadow-lg">
					<CardHeader className="50 bg-gradient-to-r from-green-50 to-sky-400">
						<CardTitle className="p-0 text-3xl font-normal text-green-800">
							{companyData.company_name} (${ticker})
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						{/* Candlestick Chart */}
						<div className="mb-8">
							<ApexCharts options={chartOptions} series={candlestickSeries} type="candlestick" height={350} />
						</div>

						{/* Client Selection and Transaction Buttons */}
						<div className="mb-4 flex items-center space-x-4">
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={open}
										className="w-[200px] justify-between border-green-300 bg-white text-green-700 hover:bg-green-50"
									>
										{selectedClient ? clients.find((client) => client.id === selectedClient)?.name : "Select client..."}
										<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput placeholder="Search client..." />
										<CommandEmpty>No client found.</CommandEmpty>
										<CommandGroup>
											{clients.map((client) => (
												<CommandItem
													key={client.id}
													onSelect={() => {
														setSelectedClient(client.id === selectedClient ? null : client.id)
														setOpen(false)
													}}
												>
													<Check
														className={cn("mr-2 h-4 w-4", selectedClient === client.id ? "opacity-100" : "opacity-0")}
													/>
													{client.name}
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
							<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
								<DialogTrigger asChild>
									<Button
										onClick={() => {
											setTransactionType("buy")
											setIsDialogOpen(true)
										}}
										className="bg-green-500 text-white hover:bg-green-600"
									>
										Buy Stock
									</Button>
								</DialogTrigger>
								<DialogTrigger asChild>
									<Button
										variant="outline"
										onClick={() => {
											setTransactionType("sell")
											setIsDialogOpen(true)
										}}
										className="border-sky-300 text-sky-700 hover:bg-sky-50"
									>
										Sell Stock
									</Button>
								</DialogTrigger>
								<DialogContent className="bg-white">
									<DialogHeader>
										<DialogTitle className="text-green-800">
											{transactionType === "buy" ? "Buy" : "Sell"} Stock
										</DialogTitle>
										<DialogDescription>
											Enter the quantity of shares you want to {transactionType === "buy" ? "buy" : "sell"}.
										</DialogDescription>
									</DialogHeader>
									<Input
										type="number"
										value={quantity}
										onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
										min="1"
										className="border-green-300 focus:ring-green-500"
									/>
									<DialogFooter>
										<Button
											onClick={handleTransaction}
											className={
												transactionType === "buy"
													? "bg-green-500 text-white hover:bg-green-600"
													: "bg-sky-500 text-white hover:bg-sky-600"
											}
										>
											{transactionType === "buy" ? "Buy" : "Sell"}
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>

						{/* Client Owned Asset Information */}
						{selectedClient && (
							<Card className="mt-6 border-green-200 shadow-md">
								<CardHeader className="bg-gradient-to-r from-green-100 to-sky-100">
									<CardTitle className="text-green-800">Client Asset Information</CardTitle>
								</CardHeader>
								<CardContent className="p-4">
									<p className="text-green-700">
										<strong>Client:</strong> {clients.find((c) => c.id === selectedClient)?.name}
									</p>
									<p className="text-sky-700">
										<strong>Owned Shares of {ticker}:</strong>{" "}
										{clients.find((c) => c.id === selectedClient)?.ownedAssets[ticker] || 0}
									</p>
									<p className="text-green-700">
										<strong>Estimated Value:</strong> $
										{(
											(clients.find((c) => c.id === selectedClient)?.ownedAssets[ticker] || 0) *
											(companyData.current_price || 0)
										).toFixed(2)}
									</p>
								</CardContent>
							</Card>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default IndividualAsset
