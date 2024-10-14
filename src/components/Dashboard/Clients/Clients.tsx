import Sidebar from "@/components/Dashboard/Sidebar"
import React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useStore from "@/store/useStore"
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
interface Client {
	id: string
	name: string
	assets: number
	performance: number
	lastUpdated: string
}

interface Asset {
	name: string
	value: number
	change: number
}

const mockClients: Client[] = [
	{ id: "1", name: "TechCorp", assets: 5000000, performance: 7.2, lastUpdated: "2024-03-15" },
	{ id: "2", name: "InnovateTech", assets: 3500000, performance: 5.8, lastUpdated: "2024-03-14" },
	{ id: "3", name: "FutureSystems", assets: 4200000, performance: 6.5, lastUpdated: "2024-03-13" },
	{ id: "4", name: "AI Solutions", assets: 2800000, performance: 8.1, lastUpdated: "2024-03-15" },
	{ id: "5", name: "DataDrive Inc.", assets: 3900000, performance: 4.9, lastUpdated: "2024-03-14" },
]

const mockAssets: Asset[] = [
	{ name: "AAPL", value: 1500000, change: 2.3 },
	{ name: "GOOGL", value: 1200000, change: -1.5 },
	{ name: "MSFT", value: 1800000, change: 3.1 },
	{ name: "AMZN", value: 900000, change: 0.8 },
	{ name: "BTC", value: 500000, change: 5.2 },
]

const performanceData = [
	{ month: "Jan", performance: 2.5 },
	{ month: "Feb", performance: 3.1 },
	{ month: "Mar", performance: 2.8 },
	{ month: "Apr", performance: 3.5 },
	{ month: "May", performance: 4.2 },
	{ month: "Jun", performance: 3.9 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]
const Clients = () => {
	// retrieve from API later
	const [clients, setClients] = useState<Client[]>(mockClients)
	const [assets, setAssets] = useState<Asset[]>(mockAssets)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [selectedClient, setSelectedClient] = useState<Client | null>(null)
	const user = useStore((state) => state.user)

	const isFundManager = user?.userType === "Fund Manager"

	const totalAssets = assets.reduce((sum: number, asset: Asset) => sum + asset.value, 0)

	const handleClientSelect = (client: Client) => {
		setSelectedClient(client)
		setIsDialogOpen(true)
	}

	return (
		<>
			<div className="flex">
				<Sidebar />
				<div className="container mx-auto p-4">
					<h1 className="mb-4 text-2xl font-bold">{isFundManager ? "Client Dashboard" : "Your Portfolio"}</h1>
					<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Performance Overview</CardTitle>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={200}>
									<LineChart data={performanceData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="performance" stroke="#8884d8" />
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Asset Allocation</CardTitle>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={200}>
									<PieChart>
										<Pie
											data={assets}
											cx="50%"
											cy="50%"
											outerRadius={80}
											fill="#8884d8"
											dataKey="value"
											label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
										>
											{assets.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>
					<Tabs defaultValue="overview" className="mb-6">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="assets">Assets</TabsTrigger>
							{isFundManager && <TabsTrigger value="clients">Clients</TabsTrigger>}
						</TabsList>
						<TabsContent value="overview">
							<Card>
								<CardHeader>
									<CardTitle>Portfolio Summary</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-2xl font-bold text-green-600">${totalAssets.toLocaleString()}</p>
									<p className="text-sm text-gray-500">Total Assets Under Management</p>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="assets">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Asset</TableHead>
										<TableHead>Value</TableHead>
										<TableHead>24h Change</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{assets.map((asset) => (
										<TableRow key={asset.name}>
											<TableCell>{asset.name}</TableCell>
											<TableCell>${asset.value.toLocaleString()}</TableCell>
											<TableCell className={asset.change >= 0 ? "text-green-600" : "text-red-600"}>
												{asset.change >= 0 ? "+" : ""}
												{asset.change}%
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TabsContent>
						{isFundManager && (
							<TabsContent value="clients">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Client</TableHead>
											<TableHead>Assets</TableHead>
											<TableHead>Performance</TableHead>
											<TableHead>Last Updated</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{clients.map((client) => (
											<TableRow key={client.id}>
												<TableCell>{client.name}</TableCell>
												<TableCell>${client.assets.toLocaleString()}</TableCell>
												<TableCell className={client.performance >= 0 ? "text-green-600" : "text-red-600"}>
													{client.performance >= 0 ? "+" : ""}
													{client.performance}%
												</TableCell>
												<TableCell>{client.lastUpdated}</TableCell>
												<TableCell>
													<Button onClick={() => handleClientSelect(client)}>View Details</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TabsContent>
						)}
					</Tabs>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{selectedClient?.name} Details</DialogTitle>
							</DialogHeader>
							<div className="py-4">
								<p>Total Assets: ${selectedClient?.assets.toLocaleString()}</p>
								<p>Performance: {selectedClient?.performance}%</p>
								<p>Last Updated: {selectedClient?.lastUpdated}</p>
							</div>
							<DialogFooter>
								<Button onClick={() => setIsDialogOpen(false)}>Close</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</>
	)
}

export default Clients
