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
import { useNavigate } from "react-router-dom"
import stocksData from "@/assets/stocks.json"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
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

interface TickerChoose {
	company_name: string
	ticker: string
}

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
	const [stocks, setStocks] = useState<TickerChoose[]>(stocksData)
	const [filteredStocks, setFilteredStocks] = useState<TickerChoose[]>([])
	const [searchTerm, setSearchTerm] = useState("")
	const [displayedStocks, setDisplayedStocks] = useState<TickerChoose[]>([])
	const [sortColumn, setSortColumn] = useState("ticker")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [hideInitially, setHideInitially] = useState(true)
	const [loading, setLoading] = useState(false) // Loading state for fake delay

	useEffect(() => {
		setDisplayedStocks(stocks.slice(0, 10))
		setFilteredStocks(stocks.slice(0, 10))
	}, [stocks])

	const handleSearch = () => {
		setLoading(true)
		setHideInitially(false)

		const randomDelay = Math.floor(Math.random() * (500 - 100 + 1)) + 100

		setTimeout(() => {
			const fuse = new Fuse(stocks, {
				keys: ["ticker", "company_name"],
				threshold: 0.3,
			})
			const result = fuse.search(searchTerm)
			const filteredResults = result.slice(0, 10).map((res) => res.item)

			setDisplayedStocks(filteredResults)
			setFilteredStocks(filteredResults)
			setLoading(false)
		}, randomDelay)
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

	return (
		<div className="flex h-full w-full">
			<Sidebar />
			<div className="w-full p-4">
				<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<Card className="border-green-200 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Market Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={200}>
								<LineChart data={marketOverviewData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line type="monotone" dataKey="value" stroke="#0ea5e9" />
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
					<Card className="border-green-200 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Sector Allocation</CardTitle>
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
				<Card className="mb-6 border-green-200 shadow-lg">
					<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
						<CardTitle className="text-green-800">Stock Search</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between py-3">
							<div className="flex items-center p-2">
								<div className="relative w-64">
									<Input
										placeholder="Search stocks..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleSearch()
											}
										}}
										className="w-full border-green-300 pr-10 focus:border-green-500 focus:ring-green-500"
									/>
									<Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />
								</div>
								<Button onClick={handleSearch} className="ml-2 bg-green-500 text-white hover:bg-green-600">
									Search
								</Button>
							</div>
							<Select onValueChange={(value) => console.log(`Filter by: ${value}`)}>
								<SelectTrigger className="mr-2 w-[180px] border-green-300">
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
						{loading ? (
							<div className="flex justify-center py-10">
								<LoadingSpinner />
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow className="bg-green-50">
										<TableHead className="cursor-pointer text-green-800" onClick={() => handleSort("ticker")}>
											Ticker {sortColumn === "ticker" && <ArrowUpDown className="inline" />}
										</TableHead>
										<TableHead className="cursor-pointer text-green-800" onClick={() => handleSort("company_name")}>
											Company Name {sortColumn === "company_name" && <ArrowUpDown className="inline" />}
										</TableHead>
										<TableHead className="text-green-800">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{!hideInitially &&
										displayedStocks.map((stock) => (
											<TableRow key={stock.ticker} className="hover:bg-sky-50">
												<TableCell className="font-medium text-green-700">{stock.ticker}</TableCell>
												<TableCell>{stock.company_name}</TableCell>
												<TableCell>
													<Button
														size="sm"
														onClick={() => handleExpand(stock.ticker)}
														className="bg-sky-500 text-white hover:bg-sky-600"
													>
														View Stock Data
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent className="bg-white">
						<DialogHeader>
							<DialogTitle className="text-green-800">Stock Details</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
