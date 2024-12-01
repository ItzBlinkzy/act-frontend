import React, { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import ApexCharts from "react-apexcharts"
import Sidebar from "@/components/Dashboard/Sidebar"
import axios from "axios"
import { baseAiUrl, baseApiUrl } from "@/config/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApexOptions } from "apexcharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Command, CommandItem, CommandList, CommandInput } from "@/components/ui/command"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useStore, { StoreModel } from "@/store/useStore"

interface HistoricalData {
	Date: string | Date
	Open: number
	High: number
	Low: number
	Close: number
}

const IndividualAsset = () => {
	const params = useParams()
	let ticker = params?.ticker

	if (!ticker?.length) ticker = "AAPL"

	const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
	const [companyData, setCompanyData] = useState<any>({})
	const [selectedClient, setSelectedClient] = useState<any>()
	const [quantity, setQuantity] = useState<number>(1)
	const [totalValue, setTotalValue] = useState<number>(0)
	const [inputType, setInputType] = useState<"quantity" | "value">("quantity")
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy")
	const clients = useStore((state: StoreModel) => state.managerClients)
	const user = useStore((state: StoreModel) => state.user)
	const userCredit = useStore((state: StoreModel) => state.user?.credit || 0)

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

	useEffect(() => {
		// Dynamically calculate total value or quantity based on input type
		if (inputType === "quantity" && companyData.currentPrice) {
			setTotalValue(quantity * companyData.currentPrice)
		} else if (inputType === "value" && companyData.currentPrice) {
			setQuantity(totalValue / companyData.currentPrice)
		}
	}, [quantity, totalValue, inputType, companyData.currentPrice])

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
				toolbar: { tools: { zoom: true } },
			},
			xaxis: { type: "datetime" },
			yaxis: { tooltip: { enabled: true } },
		}),
		[ticker],
	)

	const handleTransaction = async () => {
		if (!selectedClient?.id) {
			toast({
				title: "Error",
				description: "Please select a client.",
				variant: "destructive",
			})
			return
		}

		const totalCostOrValue = quantity * (companyData.currentPrice || 0)
		if (transactionType === "buy" && totalCostOrValue > userCredit) {
			toast({
				title: "Insufficient Credit",
				description: "You do not have enough credit to complete this transaction.",
				variant: "destructive",
			})
			return
		}

		// const apiUrl =
		// 	transactionType === "buy"
		// 		? "https://actapi.blinkzy.dev/api/v1/buy-stock"
		// 		: `https://actapi.blinkzy.dev/api/v1/update-stock/${params?.stockId || "0"}`
		// const body = {
		// 	user_id: transactionType === "buy" ? user?.id : undefined, // Replace with actual user ID
		// 	ticker: transactionType === "buy" ? ticker : undefined,
		// 	buying_quantity: transactionType === "buy" ? quantity : undefined,
		// 	selling_quantity: transactionType === "sell" ? quantity : undefined,
		// 	client_id: selectedClient,
		// }

		try {
			if (transactionType === "buy") {
				const body = {
					user_id: user?.id,
					ticker: ticker,
					buying_quantity: quantity,
					client_id: selectedClient.id,
				}
				console.log({ body })
				const response = await axios.post(`${baseApiUrl}/buy-stock`, body, { withCredentials: true })

				if (response.status === 200) {
					toast({
						title: "Transaction Successful",
						description: response.data.message,
					})
					setIsDialogOpen(false)
				}
			}
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
								<Popover>
									<PopoverTrigger asChild>
										<Button className="flex w-[200px] items-center justify-between border border-green-300 bg-white text-green-700">
											<span>
												{selectedClient
													? clients.find((client) => client.id === selectedClient.id)?.company_name
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
															setSelectedClient(client)
															// setIsPopoverOpen(false)
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
								<span className="text-3xl font-bold text-green-600">${companyData?.currentPrice?.toFixed(2)}</span>
							</div>
						</div>
					</CardContent>
				</Card>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent className="bg-white">
						<DialogHeader>
							<DialogTitle>{transactionType === "buy" ? "Buy Stock" : "Sell Stock"}</DialogTitle>
							<DialogDescription>
								Enter the quantity or total value of shares you want to {transactionType}.
							</DialogDescription>
						</DialogHeader>
						<div className="py-4">
							<div className="flex items-center space-x-4">
								<Button
									className={`${inputType === "quantity" ? "border-green-500 shadow-lg" : "border border-gray-300"}`}
									onClick={() => setInputType("quantity")}
								>
									By Quantity
								</Button>
								<Button
									className={`${inputType === "value" ? "border-green-500 shadow-lg" : "border border-gray-300"}`}
									onClick={() => setInputType("value")}
								>
									By Price
								</Button>
							</div>
							<div className="mt-4">
								{inputType === "quantity" ? (
									<>
										<label>Quantity</label>
										<Input
											type="number"
											value={quantity}
											onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
											min="0.1"
											step="0.1"
										/>
									</>
								) : (
									<>
										<label>Value</label>
										<Input
											type="number"
											value={totalValue}
											onChange={(e) => setTotalValue(parseFloat(e.target.value) || 0)}
											min="0.1"
											step="0.1"
										/>
									</>
								)}
							</div>
							<p className="mt-2 text-green-700">
								Total {transactionType === "buy" ? "Cost" : "Value"}: ${totalValue.toFixed(2)}
							</p>
						</div>
						<DialogFooter>
							<Button onClick={handleTransaction}>{transactionType === "buy" ? "Buy" : "Sell"} Stock</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

export default IndividualAsset
