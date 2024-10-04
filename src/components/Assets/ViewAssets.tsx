"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Search } from "lucide-react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts"
import Sidebar from "../Dashboard/Sidebar"

interface Stock {
	ticker: string
	logo_url: string
	trailingPE: number | null
	regularMarketPrice: number | null
	shortName: string | null
	marketCap: number | null
}

const initialStocks: Stock[] = [
	{
		logo_url: "",
		marketCap: 3439319580672,
		regularMarketPrice: null,
		shortName: "Apple Inc.",
		ticker: "AAPL",
		trailingPE: 34.483234,
	},
	{
		logo_url: "",
		marketCap: 3127005675520,
		regularMarketPrice: null,
		shortName: "Microsoft Corporation",
		ticker: "MSFT",
		trailingPE: 35.591373,
	},
	{
		logo_url: "",
		marketCap: 2063295184896,
		regularMarketPrice: null,
		shortName: "Alphabet Inc.",
		ticker: "GOOGL",
		trailingPE: 23.992817,
	},
	{
		logo_url: "",
		marketCap: 1943050387456,
		regularMarketPrice: null,
		shortName: "Amazon.com, Inc.",
		ticker: "AMZN",
		trailingPE: 44.28948,
	},
	{
		logo_url: "",
		marketCap: 824280940544,
		regularMarketPrice: null,
		shortName: "Tesla, Inc.",
		ticker: "TSLA",
		trailingPE: 72.47752,
	},
	{
		logo_url: "",
		marketCap: 2870009921536,
		regularMarketPrice: null,
		shortName: "NVIDIA Corporation",
		ticker: "NVDA",
		trailingPE: 54.672894,
	},
	{
		logo_url: "",
		marketCap: null,
		regularMarketPrice: null,
		shortName: "N/A",
		ticker: "FB",
		trailingPE: null,
	},
	{
		logo_url: "",
		marketCap: 589061881856,
		regularMarketPrice: null,
		shortName: "JP Morgan Chase & Co.",
		ticker: "JPM",
		trailingPE: 11.547127,
	},
	{
		logo_url: "",
		marketCap: 389948801024,
		regularMarketPrice: null,
		shortName: "Johnson & Johnson",
		ticker: "JNJ",
		trailingPE: 24.506807,
	},
	{
		logo_url: "",
		marketCap: 540176318464,
		regularMarketPrice: null,
		shortName: "Visa Inc.",
		ticker: "V",
		trailingPE: 29.753485,
	},
]
const marketOverviewData = [
	{ name: "Jan", value: 4000 },
	{ name: "Feb", value: 3000 },
	{ name: "Mar", value: 2000 },
	{ name: "Apr", value: 2780 },
	{ name: "May", value: 1890 },
	{ name: "Jun", value: 2390 },
]

const sectorAllocationData = [
	{ name: "Technology", value: 400 },
	{ name: "Healthcare", value: 300 },
	{ name: "Finance", value: 300 },
	{ name: "Consumer", value: 200 },
	{ name: "Energy", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function StocksAndCryptoPage() {
	// eslint-disable-next-line
	const [stocks, setStocks] = useState<Stock[]>(initialStocks)
	const [filteredStocks, setFilteredStocks] = useState<Stock[]>(initialStocks)
	const [searchTerm, setSearchTerm] = useState("")
	const [sortColumn, setSortColumn] = useState<keyof Stock>("ticker")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
	const [actionType, setActionType] = useState<"buy" | "sell">("buy")
	const [shareAmount, setShareAmount] = useState(0)

	useEffect(() => {
		const filtered = stocks.filter(
			(stock) =>
				stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
				stock.shortName?.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		setFilteredStocks(filtered)
	}, [stocks, searchTerm])

	const handleSort = (column: keyof Stock) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
		} else {
			setSortColumn(column)
			setSortDirection("asc")
		}

		const sorted = [...filteredStocks].sort((a, b) => {
			if (a[column] === null) return 1
			if (b[column] === null) return -1
			if (a[column]! < b[column]!) return sortDirection === "asc" ? -1 : 1
			if (a[column]! > b[column]!) return sortDirection === "asc" ? 1 : -1
			return 0
		})

		setFilteredStocks(sorted)
	}

	const formatMarketCap = (marketCap: number | null) => {
		if (marketCap === null) return "N/A"
		if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
		if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
		if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
		return `$${marketCap.toFixed(2)}`
	}

	const handleAction = (stock: Stock, action: "buy" | "sell") => {
		setSelectedStock(stock)
		setActionType(action)
		setIsDialogOpen(true)
	}

	const handleTransaction = () => {
		// Implement the buy/sell logic here
		console.log(`${actionType} ${shareAmount} shares of ${selectedStock?.ticker}`)
		setIsDialogOpen(false)
		setShareAmount(0)
	}

	return (
		<div className="flex">
			<Sidebar />
			<div className="w-full p-2">
				<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Market Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={200}>
								<LineChart data={marketOverviewData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line type="monotone" dataKey="value" stroke="#8884d8" />
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Sector Allocation</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={sectorAllocationData}
										cx="50%"
										cy="50%"
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
										label
									>
										{sectorAllocationData.map((_, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip />
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</div>
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center">
						<Search className="mr-2 h-5 w-5 text-gray-500" />
						<Input
							type="text"
							placeholder="Search stocks..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-64"
						/>
					</div>
					<Select onValueChange={(value) => console.log(`Filter by: ${value}`)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="tech">Technology</SelectItem>
							<SelectItem value="finance">Finance</SelectItem>
							<SelectItem value="healthcare">Healthcare</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="cursor-pointer" onClick={() => handleSort("ticker")}>
								Symbol {sortColumn === "ticker" && <ArrowUpDown className="ml-2 inline h-5 w-5 text-black " />}
							</TableHead>
							<TableHead className="cursor-pointer" onClick={() => handleSort("shortName")}>
								Name {sortColumn === "shortName" && <ArrowUpDown className="ml-2 inline h-5 w-5 text-black " />}
							</TableHead>
							<TableHead className="cursor-pointer" onClick={() => handleSort("marketCap")}>
								Market Cap {sortColumn === "marketCap" && <ArrowUpDown className="ml-2 inline h-5 w-5 text-black " />}
							</TableHead>
							<TableHead className="cursor-pointer" onClick={() => handleSort("regularMarketPrice")}>
								Price{" "}
								{sortColumn === "regularMarketPrice" && <ArrowUpDown className="ml-2 inline h-5 w-5 text-black " />}
							</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredStocks.map((stock) => (
							<TableRow key={stock.ticker}>
								<TableCell>{stock.ticker}</TableCell>
								<TableCell>{stock.shortName}</TableCell>
								<TableCell>{formatMarketCap(stock.marketCap)}</TableCell>
								<TableCell>${stock.trailingPE?.toFixed(2)}</TableCell>
								<TableCell>
									<div className="flex space-x-2">
										<Button size="sm" onClick={() => handleAction(stock, "buy")}>
											Buy
										</Button>
										<Button size="sm" variant="outline" onClick={() => handleAction(stock, "sell")}>
											Sell
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{actionType === "buy" ? "Buy" : "Sell"} {selectedStock?.ticker} Stock
							</DialogTitle>
						</DialogHeader>
						<div className="py-4">
							<p>Current Price: ${selectedStock?.trailingPE?.toFixed(2)}</p>
							<p>Market Cap: {selectedStock ? formatMarketCap(selectedStock.marketCap) : ""}</p>
							<div className="mt-4">
								<label htmlFor="amount" className="block text-sm font-medium text-gray-700">
									Number of Shares
								</label>
								<Input
									type="number"
									id="amount"
									value={shareAmount}
									onChange={(e) => setShareAmount(Number(e.target.value))}
									className="mt-1"
									min="0"
								/>
							</div>
							<p className="mt-2">
								Total {actionType === "buy" ? "Cost" : "Value"}: $
								{(shareAmount * (selectedStock?.regularMarketPrice || 0)).toFixed(2)}
							</p>
						</div>
						<DialogFooter>
							<Button onClick={handleTransaction}>{actionType === "buy" ? "Buy" : "Sell"} Shares</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
