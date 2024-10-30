"use client"

import { useState, useEffect } from "react"
import Fuse from "fuse.js"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Search } from "lucide-react"
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from "react-router-dom"
import stocksData from "@/assets/stocks.json"

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
import axios from "axios"
import { baseApiUrl } from "@/config/constants"
interface Stock {
	ticker: string
	logo_url: string
	trailingPE: number | null
	regularMarketPrice: number | null
	shortName: string | null
	marketCap: number | null
}

interface TickerChoose {
	company_name: string
	ticker: string
}

const initalStockChoose = [
	{
		company_name: "Apple Inc.",
		ticker: "AAPL",
	},
	{
		company_name: "Apple Hospitality REIT, Inc.",
		ticker: "APLE",
	},
	{
		company_name: "Maui Land & Pineapple Company, ",
		ticker: "MLP",
	},
	{
		company_name: "Pineapple Financial Inc.",
		ticker: "PAPL",
	},
	{
		company_name: "Pineapple Energy Inc.",
		ticker: "PEGY",
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
	const navigate = useNavigate()
	const [stocks] = useState<TickerChoose[]>(stocksData)
	const [filteredStocks, setFilteredStocks] = useState<TickerChoose[]>([])
	const [searchTerm, setSearchTerm] = useState("")
	const [displayedStocks, setDisplayedStocks] = useState<TickerChoose[]>([])
	const [sortColumn, setSortColumn] = useState("ticker")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
	const [shareAmount, setShareAmount] = useState(0)

	useEffect(() => {
		// Initialize display with the first 10 stocks
		setDisplayedStocks(stocks.slice(0, 10))
		setFilteredStocks(stocks.slice(0, 10)) // initialize filteredStocks with first 10
	}, [stocks])

	const handleSearch = () => {
		const fuse = new Fuse(stocks, {
			keys: ["ticker", "company_name"],
			threshold: 0.3,
		})
		const result = fuse.search(searchTerm)
		const filteredResults = result.slice(0, 10).map((res) => res.item)
		setDisplayedStocks(filteredResults)
		setFilteredStocks(filteredResults) // synchronize filteredStocks with displayedStocks
	}

	const handleSort = (column: keyof TickerChoose) => {
		const direction = column === sortColumn && sortDirection === "asc" ? "desc" : "asc"
		setSortColumn(column)
		setSortDirection(direction)

		const sorted = [...filteredStocks].sort((a, b) => {
			const valA = a[column] || ""
			const valB = b[column] || ""
			return direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA)
		})
		setFilteredStocks(sorted)
	}

	const handleExpand = (ticker: string) => {
		navigate(`/dashboard/assets/${ticker}`)
	}

	const formatMarketCap = (marketCap: number | null) => {
		if (marketCap === null) return "N/A"
		if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
		if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
		if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
		return `$${marketCap.toFixed(2)}`
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
							placeholder="Search stocks..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSearch()
								}
							}}
							className="w-64"
						/>

						<Button onClick={handleSearch} className="ml-2">
							Search
						</Button>
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
							<TableHead onClick={() => handleSort("ticker")}>
								Ticker {sortColumn === "ticker" && <ArrowUpDown />}
							</TableHead>
							<TableHead onClick={() => handleSort("company_name")}>
								Company Name {sortColumn === "company_name" && <ArrowUpDown />}
							</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{displayedStocks.map((stock) => (
							<TableRow key={stock.ticker}>
								<TableCell>{stock.ticker}</TableCell>
								<TableCell>{stock.company_name}</TableCell>
								<TableCell>
									<Button size="sm" onClick={() => handleExpand(stock.ticker)}>
										View Stock Data
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent>
						<DialogHeader></DialogHeader>
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
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
