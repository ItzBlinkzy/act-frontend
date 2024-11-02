import React, { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import ApexCharts from "react-apexcharts"
import Sidebar from "@/components/Dashboard/Sidebar"
import axios from "axios"
import { baseAiUrl } from "@/config/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApexOptions } from "apexcharts"
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
import { Check, ChevronsUpDown, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useStore, { StoreModel } from "@/store/useStore"

interface HistoricalData {
	Date: string | Date // Use `string` if `Date` is received as a string, or `Date` if already a Date object
	Open: number
	High: number
	Low: number
	Close: number
}

const IndividualAsset = () => {
	const params = useParams()
	let ticker = params?.ticker

	if (!ticker?.length) ticker = "AAPL"

	const [historicalData, setHistoricalData] = useState([])
	const [companyData, setCompanyData] = useState<any>({})
	const [selectedClient, setSelectedClient] = useState<any>(null)
	const [quantity, setQuantity] = useState(1)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy")
	const clients = useStore((state: StoreModel) => state.managerClients)

	useEffect(() => {
		const getStockHistory = async () => {
			try {
				const response = await axios.post(`${baseAiUrl}/api/search-stock-by-ticker`, { stock_ticker: ticker })
				setHistoricalData(response.data.historical_data)
				setCompanyData({ ...response.data.stock_data, company_name: response.data.company_name })
			} catch (e: any) {
				console.error(e)
				toast({
					title: "Internal Server Error",
					description: "An error occurred while retrieving the stock information.",
					variant: "destructive",
				})
			}
		}
		getStockHistory()
	}, [ticker])

	const limitedHistoricalData: HistoricalData[] = useMemo(() => historicalData.slice(-200), [historicalData])
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

	const chartOptions: ApexOptions = useMemo(
		() => ({
			chart: {
				type: "candlestick",
				height: 350,
				id: "candlestick-chart",
				zoom: { enabled: true, autoScaleYaxis: true },
				toolbar: {
					tools: {
						zoom: true, // Enable zoom button
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

			toast({
				title: "Transaction Successful",
				description: `Successfully ${transactionType === "buy" ? "bought" : "sold"} ${quantity} shares of ${ticker}`,
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
				<Card className="m-4 p-0 shadow-lg">
					<CardHeader className="bg-gradient-to-r from-green-50 to-sky-400">
						<CardTitle className="p-0 text-3xl font-normal text-green-800">
							{companyData.longName || companyData.company_name} (${ticker})
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="mb-8">
							<ApexCharts options={chartOptions} series={candlestickSeries} type="candlestick" height={350} />
						</div>
						<div className="mb-4 flex items-center justify-between">
							<div className="flex items-start space-x-4">
								<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
									<PopoverTrigger asChild>
										<Button className="flex w-[200px] items-center justify-between border border-green-300 bg-white text-green-700">
											<span>
												{selectedClient
													? clients.find((client) => client.id === selectedClient)?.company_name
													: "Select a client..."}
											</span>
											<ChevronDown className="h-5 w-5 text-green-700" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] border border-green-300 bg-white p-2">
										<Command>
											<CommandInput placeholder="Search clients..." />
											<CommandList>
												{(clients && clients.length > 0
													? clients
													: [
															{ id: 1, company_name: "Placeholder Client 1" },
															{ id: 2, company_name: "Placeholder Client 2" },
															{ id: 3, company_name: "Placeholder Client 3" },
														]
												).map((client) => (
													<CommandItem
														key={client.id}
														onSelect={() => {
															setSelectedClient(client.id)
															setIsPopoverOpen(false)
														}}
													>
														{client.company_name}
													</CommandItem>
												))}
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>

								<Button
									onClick={() => {
										setTransactionType("buy")
										setIsDialogOpen(true)
									}}
									className="bg-green-400 text-white hover:bg-green-600"
								>
									Buy Stock
								</Button>
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
							</div>
							<div className="rounded-lg border border-slate-400 bg-green-100 px-4 py-2">
								<span className="text-3xl font-bold text-green-600">${companyData.currentPrice.toFixed(2)}</span>
							</div>
						</div>

						{selectedClient && (
							<Card className="mt-6 shadow-md">
								<CardHeader className="bg-gradient-to-r from-green-100 to-sky-100">
									<CardTitle className="text-green-800">Client Asset Information</CardTitle>
								</CardHeader>
								<CardContent className="p-4">
									<p className="text-green-700">
										<strong>Client: </strong>
										{clients.find((client) => client.id === selectedClient)?.company_name}
									</p>
									<p className="text-sky-700">
										<strong>Owned Shares of {ticker}:</strong> Placeholder
									</p>
									<p className="text-green-700">
										<strong>Estimated Value:</strong> $Placeholder
									</p>
								</CardContent>
							</Card>
						)}
					</CardContent>
				</Card>
				<div className="mb-8 grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
					{/* Stock Overview Card */}
					<Card className="transform overflow-hidden rounded-lg border shadow-xl transition-transform">
						<CardHeader className="bg-gradient-to-br from-green-50 to-sky-50 p-6 text-center">
							<CardTitle className="text-lg font-bold tracking-wide text-green-900">📈 Stock Overview</CardTitle>
						</CardHeader>
						<CardContent className="rounded-b-lg bg-white p-6">
							<div className="grid grid-cols-2 gap-6 text-center">
								<div className="space-y-4">
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">Current Price</p>
										<p className="text-lg font-bold text-green-700">${companyData.currentPrice?.toFixed(2)}</p>
									</div>
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">Market Cap</p>
										<p className="text-lg font-bold text-green-700">${(companyData.marketCap / 1e9).toFixed(2)}B</p>
									</div>
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">P/E Ratio</p>
										<p className="text-lg font-bold text-green-700">{companyData.trailingPE?.toFixed(2)}</p>
									</div>
								</div>
								<div className="space-y-4">
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">52 Week High</p>
										<p className="text-lg font-bold text-green-700">${companyData.fiftyTwoWeekHigh?.toFixed(2)}</p>
									</div>
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">52 Week Low</p>
										<p className="text-lg font-bold text-green-700">${companyData.fiftyTwoWeekLow?.toFixed(2)}</p>
									</div>
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">Volume</p>
										<p className="text-lg font-bold text-green-700">{companyData.volume?.toLocaleString()}</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="transform overflow-hidden rounded-lg border shadow-xl transition-transform">
						<CardHeader className="bg-gradient-to-br from-sky-50 to-green-50 p-6 text-center">
							<CardTitle className="text-lg font-bold tracking-wide text-green-900">📊 Key Metrics</CardTitle>
						</CardHeader>
						<CardContent className="rounded-b-lg bg-white p-6">
							<div className="grid grid-cols-2 gap-6 text-center">
								<div className="space-y-4">
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">Revenue Growth</p>
										<p className="text-lg font-bold text-green-700">{(companyData.revenueGrowth * 100).toFixed(2)}%</p>
									</div>
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">Profit Margin</p>
										<p className="text-lg font-bold text-green-700">{(companyData.profitMargins * 100).toFixed(2)}%</p>
									</div>
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">Debt to Equity</p>
										<p className="text-lg font-bold text-green-700">{companyData.debtToEquity?.toFixed(2)}</p>
									</div>
								</div>
								<div className="space-y-4">
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">ROE</p>
										<p className="text-lg font-bold text-green-700">{(companyData.returnOnEquity * 100).toFixed(2)}%</p>
									</div>
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">Beta</p>
										<p className="text-lg font-bold text-green-700">{companyData.beta?.toFixed(2)}</p>
									</div>
									<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-200 p-4 shadow-inner">
										<p className="font-semibold text-sky-800">Dividend Yield</p>
										<p className="text-lg font-bold text-green-700">{(companyData.dividendYield * 100).toFixed(2)}%</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="bg-white">
					<DialogHeader>
						<DialogTitle className="text-green-800">{transactionType === "buy" ? "Buy" : "Sell"} Stock</DialogTitle>
						<DialogDescription className="text-sky-700">
							Enter the quantity of shares you want to {transactionType === "buy" ? "buy" : "sell"}.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<p className="text-green-700">
							<strong>Current Price:</strong> ${companyData.currentPrice?.toFixed(2)}
						</p>
						<div className="mt-4">
							<label htmlFor="quantity" className="block text-sm font-medium text-green-700">
								Number of Shares
							</label>
							<Input
								id="quantity"
								type="number"
								value={quantity}
								onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
								className="mt-1 border-green-300 focus:border-green-500 focus:ring-green-500"
								min="1"
							/>
						</div>
						<p className="mt-2 text-sky-700">
							<strong>Total {transactionType === "buy" ? "Cost" : "Value"}:</strong> $
							{(quantity * (companyData.currentPrice || 0)).toFixed(2)}
						</p>
					</div>
					<DialogFooter>
						<Button onClick={handleTransaction} className="bg-green-400 text-white hover:bg-green-600">
							{transactionType === "buy" ? "Buy" : "Sell"} Shares
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default IndividualAsset
