import Sidebar from "@/components/Dashboard/Sidebar"
import useStore from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HomeIcon } from "lucide-react"

interface BlogPost {
	id: number
	title: string
	excerpt: string
}

interface Stock {
	symbol: string
	name: string
	value: number
}

const DashboardHome = () => {
	const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
	const [topStocks, setTopStocks] = useState<Stock[]>([])
	const user = useStore((state) => state.user)

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

		setTopStocks([
			{ symbol: "AAPL", name: "Apple Inc.", value: 150.69 },
			{ symbol: "MSFT", name: "Microsoft Corporation", value: 305.69 },
			{ symbol: "GOOGL", name: "Alphabet Inc.", value: 2750.69 },
			{ symbol: "AMZN", name: "Amazon.com Inc.", value: 3380.69 },
			{ symbol: "FB", name: "Meta Platforms Inc.", value: 330.69 },
			{ symbol: "TSLA", name: "Tesla Inc.", value: 850.69 },
			{ symbol: "BRK.A", name: "Berkshire Hathaway Inc.", value: 439520.69 },
			{ symbol: "NVDA", name: "NVIDIA Corporation", value: 220.69 },
			{ symbol: "JPM", name: "JPMorgan Chase & Co.", value: 160.69 },
			{ symbol: "JNJ", name: "Johnson & Johnson", value: 170.69 },
		])
	}, [])

	return (
		<div className="flex h-full w-full bg-gradient-to-br from-green-100 to-sky-100">
			<Sidebar />
			<div className="flex w-full flex-col">
				<Card className="m-4 border-green-200 p-0 shadow-lg">
					<div className="mt-4 border-b border-b-slate-400 p-2">
						<HomeIcon className="h-8 w-8 text-green-600" />
					</div>
					<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
						<CardTitle className="text-3xl font-normal text-green-800">
							Welcome back, <span className="font-bold text-sky-700">{user?.firstName}</span>
						</CardTitle>
					</CardHeader>
				</Card>
				<div className="grid w-full grid-cols-1 gap-6 p-4 md:grid-cols-2">
					<Card className="border-green-200 shadow-lg">
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
					<Card className="border-green-200 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Recent Blog Posts</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<ScrollArea className="h-[200px]">
								{recentPosts.map((post) => (
									<div key={post.id} className="mb-4 rounded-lg bg-white p-4 shadow-sm">
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
					<Card className="border-green-200 shadow-lg md:col-span-2">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Popular Stocks</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<div className="grid grid-cols-1 gap-4 rounded-sm border border-green-200 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
								{topStocks.map((stock) => (
									<div key={stock.symbol} className="rounded-lg border bg-gradient-to-r p-4">
										<h3 className="font-bold text-green-700">{stock.symbol}</h3>
										<p className="text-2xl text-sky-600">{stock.name}</p>
										<p className="font-semibold text-green-600">${stock.value.toFixed(2)}</p>
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
