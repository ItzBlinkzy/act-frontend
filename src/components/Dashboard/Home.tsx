import { useEffect, useState } from "react"
import Sidebar from "@/components/Dashboard/Sidebar"
import useStore from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HomeIcon } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { baseAiUrl } from "@/config/constants"

interface BlogPost {
	id: number
	title: string
	excerpt: string
}

interface Stock {
	symbol: string
	name: string
	value: number
	isUp?: boolean // Indicates whether the price went up
}

const DashboardHome = () => {
	const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
	const [topStocks, setTopStocks] = useState<Stock[]>([])
	const user = useStore((state) => state.user)
	const managerClients = useStore((state) => state.managerClients)

	const fetchStockData = async () => {
		try {
			const tickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA", "RGTI", "NVDA", "JPM", "JNJ"]
			const response = await fetch(`${baseAiUrl}/get_stock_prices`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ stock_tickers: tickers }),
			})
			const data = await response.json()
			console.log(data.stocks.map((el: any) => console.log(el.currentPrice)))
			const updatedStocks = data.stocks.map((stock: any) => {
				const previous = topStocks.find((s) => s.symbol === stock.ticker)
				return {
					symbol: stock.ticker,
					name: stock.shortName,
					value: stock.currentPrice,
					isUp: previous ? stock.currentPrice > previous.value : undefined,
				}
			})
			setTopStocks(updatedStocks)
		} catch (error) {
			toast({
				title: "Error updating stocks",
				description: "An error occurred while updating the stocks.",
				variant: "destructive",
			})
		}
	}

	useEffect(() => {
		setRecentPosts([
			{ id: 1, title: "Understanding Market Trends", excerpt: "An in-depth look at current market trends..." },
			{
				id: 2,
				title: "Top Investment Strategies for 2024",
				excerpt: "Explore the most effective investment strategies...",
			},
			{
				id: 3,
				title: "The Impact of AI on Trading",
				excerpt: "How artificial intelligence is reshaping the trading landscape...",
			},
		])

		fetchStockData()
	}, [])

	return (
		<div className="flex h-full w-full bg-gradient-to-br from-green-50 to-sky-100">
			<Sidebar />
			<div className="flex w-full flex-col">
				<Card className="m-4 border p-0 shadow-lg">
					<div className="mt-4 border-b border-b-slate-400 p-2">
						<HomeIcon className="h-8 w-8 text-green-600" />
					</div>
					<CardTitle className="p-4 text-3xl font-normal text-green-800">
						Welcome back,{" "}
						<span className="animate-gradient bg-gradient-to-r from-blue-800 to-sky-400 bg-clip-text text-4xl font-bold text-transparent">
							{user?.firstName}
						</span>
					</CardTitle>
				</Card>
				<div className="grid w-full grid-cols-1 gap-6 p-4 md:grid-cols-2">
					<Card className="border  shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Quick Links</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<div className="flex flex-col space-y-2">
								<Link to="/dashboard/clients">
									<Button
										variant="outline"
										className="w-full justify-start border-green-300 hover:bg-green-50 hover:text-green-700"
									>
										Clients
									</Button>
								</Link>
								<Link to="/dashboard/ai">
									<Button
										variant="outline"
										className="w-full justify-start border-sky-300 hover:bg-sky-50 hover:text-sky-700"
									>
										Agentic AI
									</Button>
								</Link>
								<Link to="/dashboard/assets">
									<Button
										variant="outline"
										className="w-full justify-start border-green-300 hover:bg-green-50 hover:text-green-700"
									>
										Stocks & Crypto
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
					<Card className="border shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Recent Blog Posts</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<ScrollArea className="h-[200px]">
								{recentPosts.map((post) => (
									<div key={post.id} className="mb-4 rounded-lg border bg-white p-4 shadow-sm ">
										<h3 className="text-lg font-semibold text-green-700">{post.title}</h3>
										<p className="text-sm text-sky-600">{post.excerpt}</p>
										<Link to={`/blog/${post.id}`} className="text-green-500 hover:text-green-600 hover:underline">
											Read more
										</Link>
									</div>
								))}
							</ScrollArea>
						</CardContent>
					</Card>
					<Card className="border  shadow-lg md:col-span-2">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Popular Stocks</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<div className="flex flex-wrap gap-4 rounded-sm border border p-4">
								{topStocks.map((stock) => (
									<div
										key={stock.symbol}
										className="grow-0 basis-64 rounded-lg border bg-gradient-to-br from-purple-400/10 to-blue-100 p-4"
									>
										<h3 className="font-bold text-green-700">{stock.symbol}</h3>
										<p className="text-sky-600">{stock.name}</p>
										<p className="font-semibold text-green-600">${stock.value}</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default DashboardHome
