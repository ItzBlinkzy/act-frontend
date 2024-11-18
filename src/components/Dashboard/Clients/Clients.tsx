import Sidebar from "@/components/Dashboard/Sidebar"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import useStore from "@/store/useStore"
import TimeAgo from "react-timeago"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import axios from "axios"
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
import { baseApiUrl } from "@/config/constants"
import { toast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { StoreModel } from "@/store/useStore"

interface IClient {
	id: string
	company_name: string
	created_at: string
	updated_at: string
	deleted_at: Date | null
}

interface Asset {
	name: string
	value: number
	change: number
}

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
	const user = useStore((state: StoreModel) => state.user)
	const currentClients = useStore((state: StoreModel) => state.managerClients)
	const navigate = useNavigate()
	const [assets] = useState<Asset[]>(mockAssets)
	const [loading, setLoading] = useState(false)
	const [alertDialogOpen, setAlertDialogOpen] = useState(false)
	const [clientToDelete, setClientToDelete] = useState<null | IClient>(null)
	const [deleteClientInputValue, setDeleteClientInputValue] = useState("")

	const isDeleteEnabled = deleteClientInputValue === clientToDelete?.company_name

	const handleClientSelect = (client: IClient) => {
		navigate(`/dashboard/clients/${client.id}`)
	}

	const handleDeleteClient = async (client: IClient | null) => {
		if (!client) return
		setLoading(true)
		try {
			const response = await axios.delete(`${baseApiUrl}/delete-client/${client.id}`, { withCredentials: true })
			if (response.status === 200) {
				toast({
					title: `Client successfully deleted.`,
					description: `${client.company_name} was successfully deleted.`,
					variant: "default", 
				})
			}
		} catch (e: any) {
			console.log(e)
			toast({
				title: "Internal Server Error",
				description: `Could not fetch delete client - ${client.company_name}. Try again later.`,
				variant: "destructive",
			})
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!user?.id) return
	}, [user])

	const isFundManager = user?.userType === "Fund Manager"
	const totalAssets = assets.reduce((sum: number, asset: Asset) => sum + asset.value, 0)

	return (
		<div className="flex min-h-screen bg-gradient-to-br from-green-100 to-sky-100">
			<Sidebar />
			<AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-green-800">Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete{" "}
							<span className="font-bold text-sky-700">{clientToDelete?.company_name}</span> and remove their data from
							our servers. This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="mt-4">
						<p className="text-sm text-gray-700">
							Type <span className="font-bold text-sky-700">{clientToDelete?.company_name}</span> to confirm deletion.
						</p>
						<input
							type="text"
							value={deleteClientInputValue}
							onChange={(e) => setDeleteClientInputValue(e.target.value)}
							placeholder="Enter client name"
							className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-green-500"
						/>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel
							onClick={() => {
								setAlertDialogOpen(false)
								setDeleteClientInputValue("")
							}}
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => handleDeleteClient(clientToDelete)}
							className="bg-red-600 text-white hover:bg-red-700"
							disabled={!isDeleteEnabled}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<div className="container mx-auto flex-1 p-4">
				<h1 className="mb-4 text-2xl font-bold text-green-800">
					{isFundManager ? "Client Dashboard" : "Your Portfolio"}
				</h1>
				<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<Card className=" shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Performance Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={200}>
								<LineChart data={performanceData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line type="monotone" dataKey="performance" stroke="#0ea5e9" />
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
					<Card className=" shadow-lg">
						<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
							<CardTitle className="text-green-800">Asset Allocation</CardTitle>
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
										label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
									>
										{assets.map((_, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</div>
				<div>
					<Tabs
						defaultValue={user?.userType === "Fund Manager" ? "clients" : "overview"}
						className="mb-6 rounded-md bg-white shadow-md"
					>
						<div className="p-4">
							<TabsList className="border border-slate-400 bg-gradient-to-r from-green-100 to-sky-100">
								<TabsTrigger
									value="overview"
									className="data-[state=active]:bg-white data-[state=active]:text-green-800"
								>
									Overview
								</TabsTrigger>
								{isFundManager && (
									<TabsTrigger
										value="clients"
										className="data-[state=active]:bg-white data-[state=active]:text-green-800"
									>
										Clients
									</TabsTrigger>
								)}
							</TabsList>
						</div>
						<TabsContent value="overview">
							<Card className="">
								<CardHeader className="bg-gradient-to-r from-green-50 to-sky-50">
									<CardTitle className="text-green-800">Portfolio Summary</CardTitle>
								</CardHeader>
								<CardContent className="p-6">
									<p className="text-2xl font-bold text-green-600">${totalAssets.toLocaleString()}</p>
									<p className="text-sm text-sky-600">Total Assets Under Management</p>
								</CardContent>
							</Card>
						</TabsContent>
						{isFundManager && (
							<TabsContent value="clients">
								<Card className="">
									<CardHeader className="bg-gradient-to-t from-green-50 to-sky-50">
										<CardTitle className="text-green-800">{currentClients?.length} Available Clients</CardTitle>
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow className="bg-green-50">
													<TableHead className="text-green-800">Client</TableHead>
													<TableHead className="text-green-800">Last Updated</TableHead>
													<TableHead className="text-green-800">Actions</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{loading && (
													<TableRow>
														<TableCell colSpan={4} className="text-center">
															<LoadingSpinner />
														</TableCell>
													</TableRow>
												)}
												{currentClients?.length === 0 && !loading && (
													<TableRow>
														<TableCell colSpan={4} className="text-center text-sky-600">
															No current clients.
														</TableCell>
													</TableRow>
												)}
												{currentClients?.length &&
													currentClients.map((client: IClient) => (
														<TableRow key={client.id} className="hover:bg-green-50">
															<TableCell className="font-bold text-green-700">{client.company_name}</TableCell>
															<TableCell className="text-sky-600">
																<div className="group relative">
																	<TimeAgo date={new Date(client.updated_at)} />
																	<div className="absolute bottom-full left-0 hidden w-auto rounded bg-gray-700 px-2 py-1 text-white group-hover:block">
																		{new Date(client.updated_at).toLocaleString()}
																	</div>
																</div>
															</TableCell>
															<TableCell>
																<Button
																	onClick={() => handleClientSelect(client)}
																	className="mr-2 bg-green-500 text-white hover:bg-green-600"
																>
																	View
																</Button>
																<Button
																	onClick={() => {
																		setClientToDelete(client)
																		setAlertDialogOpen(true)
																	}}
																	className="bg-black text-white hover:bg-red-500"
																>
																	Delete
																</Button>
															</TableCell>
														</TableRow>
													))}
											</TableBody>
										</Table>
									</CardContent>
								</Card>
							</TabsContent>
						)}
					</Tabs>
				</div>
			</div>
		</div>
	)
}

export default Clients
