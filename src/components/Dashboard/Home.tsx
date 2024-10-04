import Sidebar from "@/components/Dashboard/Sidebar"
import useStore from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "../ui/button"
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
	const user = useStore((state) => state.user)
	return (
		<div className="flex h-full w-full">
			<Sidebar />
			<div className="flex w-full flex-col bg-secondary">
				<Card className="m-4 p-0">
					<div className="ml-4 mt-4">
						<HomeIcon />
					</div>
					<CardHeader>
						<CardTitle className="text-3xl font-normal p-0">
							Welcome back, <span>{user?.firstName}</span>
						</CardTitle>
					</CardHeader>
				</Card>
				<div className="grid w-full grid-cols-1 gap-6 p-4 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Quick Links</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col space-y-2">
								<Link to="/dashboard/clients">
									<Button variant="outline" className="w-full justify-start">
										Clients
									</Button>
								</Link>
								<Link to="/dashboard/ai">
									<Button variant="outline" className="w-full justify-start">
										Agentic AI
									</Button>
								</Link>
								<Link to="/dashboard/assets">
									<Button variant="outline" className="w-full justify-start">
										Stocks & Crypto
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Recent Blog Posts</CardTitle>
						</CardHeader>
						<CardContent>
							<ScrollArea className="h-[200px]">
								{recentPosts.map((post) => (
									<div key={post.id} className="mb-4">
										<h3 className="text-lg font-semibold">{post.title}</h3>
										<p className="text-sm text-gray-600">{post.excerpt}</p>
										<Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">
											Read more
										</Link>
									</div>
								))}
							</ScrollArea>
						</CardContent>
					</Card>
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle>Popular Stocks</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
								{topStocks.map((stock) => (
									<div key={stock.symbol} className="rounded-lg bg-gray-100 p-3">
										<h3 className="font-bold">{stock.symbol}</h3>
										<p className="text-sm">{stock.name}</p>
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
