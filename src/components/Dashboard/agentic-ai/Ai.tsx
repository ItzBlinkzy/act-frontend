"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, Info } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Sidebar from "../Sidebar"

interface Recommendation {
	id: string
	symbol: string
	name: string
	action: "buy" | "sell" | "hold"
	confidence: number
	price: number
	description: string
}

const sampleRecommendations: Recommendation[] = [
	{
		id: "1",
		symbol: "AAPL",
		name: "Apple Inc.",
		action: "buy",
		confidence: 85,
		price: 150.25,
		description:
			"Apple's strong ecosystem, consistent revenue growth, and upcoming product launches make it an attractive buy. The company's focus on services and wearables provides additional growth avenues beyond its core iPhone business.",
	},
	{
		id: "2",
		symbol: "GOOGL",
		name: "Alphabet Inc.",
		action: "hold",
		confidence: 70,
		price: 2750.01,
		description:
			"While Alphabet's dominant position in search and digital advertising remains strong, increasing regulatory scrutiny and potential antitrust actions suggest a cautious approach. Hold for now and monitor developments closely.",
	},
	{
		id: "3",
		symbol: "TSLA",
		name: "Tesla Inc.",
		action: "sell",
		confidence: 60,
		price: 650.75,
		description:
			"Tesla faces increasing competition in the electric vehicle market, and its current valuation may be difficult to justify. Consider taking profits or reducing exposure, especially if you have significant gains.",
	},
	{
		id: "4",
		symbol: "MSFT",
		name: "Microsoft Corporation",
		action: "buy",
		confidence: 90,
		price: 305.78,
		description:
			"Microsoft's cloud business continues to show strong growth, and its diversified product portfolio provides stability. The company's strategic acquisitions and AI initiatives position it well for future growth.",
	},
	{
		id: "5",
		symbol: "AMZN",
		name: "Amazon.com Inc.",
		action: "hold",
		confidence: 75,
		price: 3380.05,
		description:
			"Amazon's e-commerce dominance and AWS leadership are strong positives, but potential regulatory challenges and margin pressures in its retail business suggest a hold strategy. Monitor for opportunities to increase position on any significant pullbacks.",
	},
]

export default function RecommendationsPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [recommendations, setRecommendations] = useState<Recommendation[]>(sampleRecommendations)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	// const user = useStore((state) => state.user)
	// const managerClients = useStore((state) => state.managerClients)

	const fetchRecommendations = async () => {
		setIsLoading(true)
		setError(null)
		try {
			// Simulating API call with sample data
			await new Promise((resolve) => setTimeout(resolve, 1000))

			const filteredRecommendations = sampleRecommendations.filter(
				(rec) =>
					rec.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
					rec.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			setRecommendations(filteredRecommendations)
		} catch (err) {
			setError("An error occurred while fetching recommendations. Please try again.")
			console.error("Error fetching recommendations:", err)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchRecommendations()
	}, [])

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		fetchRecommendations()
	}

	const getActionColor = (action: string) => {
		switch (action) {
			case "buy":
				return "bg-green-100 text-green-800"
			case "sell":
				return "bg-red-100 text-red-800"
			case "hold":
				return "bg-yellow-100 text-yellow-800"
			default:
				return "bg-gray-100 text-gray-800"
		}
	}

	return (
		<div className="flex min-h-screen bg-gradient-to-br from-green-100 to-sky-100">
			<Sidebar />
			<div className="container mx-auto p-4">
				<h1 className="mb-4 text-2xl font-bold text-green-800">Stock Recommendations</h1>
				<Card className="mb-6  shadow-lg">
					<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
						<CardTitle className="text-green-800">Search Recommendations</CardTitle>
						<CardDescription className="text-sky-700">
							Enter a stock symbol or name to search for recommendations
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSearch} className="flex space-x-2 p-4">
							<Input
								type="text"
								placeholder="Search stocks..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="grow border-green-300 focus:border-green-500 focus:ring-green-500"
							/>
							<Button type="submit" disabled={isLoading} className="bg-green-500 text-white hover:bg-green-600">
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Searching...
									</>
								) : (
									<>
										<Search className="mr-2 h-4 w-4" />
										Search
									</>
								)}
							</Button>
						</form>
					</CardContent>
				</Card>
				{error && (
					<Card className="mb-6 border-red-200 bg-red-50">
						<CardContent className="py-4 text-red-800">{error}</CardContent>
					</Card>
				)}
				<Card className=" shadow-lg">
					<CardHeader className="bg-gradient-to-b from-green-50 to-sky-50">
						<CardTitle className="text-green-800">Recommendations</CardTitle>
						<CardDescription className="text-sky-700">
							Recommendations of your current portfolio based on current market analysis and AI Predictions
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="flex h-32 items-center justify-center">
								<Loader2 className="h-8 w-8 animate-spin text-green-500" />
							</div>
						) : recommendations.length > 0 ? (
							<Table>
								<TableHeader>
									<TableRow className="bg-sky-200">
										<TableHead className="text-green-800">Symbol</TableHead>
										<TableHead className="text-green-800">Name</TableHead>
										<TableHead className="text-green-800">Action</TableHead>
										<TableHead className="text-green-800">Confidence</TableHead>
										<TableHead className="text-green-800">Price</TableHead>
										<TableHead className="text-green-800">Description</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{recommendations.map((rec) => (
										<TableRow key={rec.id} className="hover:bg-sky-50">
											<TableCell className="font-medium text-green-700">{rec.symbol}</TableCell>
											<TableCell className="text-sky-700">{rec.name}</TableCell>
											<TableCell>
												<Badge className={getActionColor(rec.action)}>{rec.action.toUpperCase()}</Badge>
											</TableCell>
											<TableCell className="text-sky-700">{rec.confidence}%</TableCell>
											<TableCell className="text-sky-700">${rec.price.toFixed(2)}</TableCell>
											<TableCell>
												<Dialog>
													<DialogTrigger asChild>
														<Button
															variant="outline"
															size="sm"
															className="border-green-300 text-green-700 hover:bg-green-50"
														>
															<Info className="mr-2 h-4 w-4" />
															View
														</Button>
													</DialogTrigger>
													<DialogContent className="bg-white sm:max-w-[425px]">
														<DialogHeader>
															<DialogTitle className="text-green-800">
																{rec.symbol} - {rec.name}
															</DialogTitle>
															<DialogDescription className="text-sky-700">
																AI-generated recommendation Description
															</DialogDescription>
														</DialogHeader>
														<div className="mt-4">
															<p>
																<strong className="text-green-700">Action:</strong>{" "}
																<Badge className={getActionColor(rec.action)}>{rec.action.toUpperCase()}</Badge>
															</p>
															<p>
																<strong className="text-green-700">Confidence:</strong>{" "}
																<span className="text-sky-700">{rec.confidence}%</span>
															</p>
															<p>
																<strong className="text-green-700">Current Price:</strong>{" "}
																<span className="text-sky-700">${rec.price.toFixed(2)}</span>
															</p>
															<p className="mt-2">
																<strong className="text-green-700">Analysis:</strong>
															</p>
															<p className="mt-1 text-sm text-sky-700">{rec.description}</p>
														</div>
													</DialogContent>
												</Dialog>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<p className="py-4 text-center text-sky-700">No recommendations found. Try a different search term.</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
