import { useState } from "react"
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
import axios from "axios"
import { baseAiUrl } from "@/config/constants"

interface Recommendation {
	id: string
	action: "buy" | "sell" | "hold"
	description: string
}

const RecommendationsPage = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [recommendations, setRecommendations] = useState<Recommendation[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchRecommendations = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await axios.post(`${baseAiUrl}/recommendation`, { stock_ticker: searchTerm })
			const data = response.data

			if (data.error) {
				setError(data.error)
				return
			}

			setRecommendations([
				{
					id: searchTerm,
					action: data.action,
					description: data.description,
				},
			])
		} catch (err) {
			setError("An error occurred while fetching recommendations. Please try again.")
			console.error("Error fetching recommendations:", err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (searchTerm.trim() === "") {
			setError("Please enter a stock symbol.")
			return
		}
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
				<Card className="mb-6 shadow-lg">
					<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
						<CardTitle className="text-green-800">Search Recommendations</CardTitle>
						<CardDescription className="text-sky-700">
							Enter a stock symbol to search for recommendations
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
				<Card className="shadow-lg">
					<CardHeader className="bg-gradient-to-b from-green-50 to-sky-50">
						<CardTitle className="text-green-800">Recommendations</CardTitle>
						<CardDescription className="text-sky-700">
							AI-generated recommendations based on the current market analysis
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
										<TableHead className="text-green-800">Description</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{recommendations.map((rec) => (
										<TableRow key={rec.id} className="hover:bg-sky-50">
											<TableCell className="font-medium text-green-700">{rec.id}</TableCell>
											<TableCell className="text-sky-700">{rec.id}</TableCell>
											<TableCell>
												<Badge className={getActionColor(rec.action)}>{rec.action.toUpperCase()}</Badge>
											</TableCell>
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
																AI recommends to {recommendations[0].action}
															</DialogTitle>
															<DialogDescription className="text-sky-700">
																AI-generated recommendation Description
															</DialogDescription>
														</DialogHeader>
														<div className="mt-4">
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

export default RecommendationsPage
