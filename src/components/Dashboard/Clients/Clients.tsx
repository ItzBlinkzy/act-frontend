import Sidebar from "@/components/Dashboard/Sidebar"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import useStore from "@/store/useStore"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
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
import { baseAPIURL } from "@/config/constants"
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
	// retrieve from API later
	const user = useStore((state: StoreModel) => state.user)
	const managerClients = useStore((state: StoreModel) => state.managerClients)
	const setManagerClients = useStore((state: StoreModel) => state.setManagerClients)
	const navigate = useNavigate()
	const [assets] = useState<Asset[]>(mockAssets)
	const [loading, setLoading] = useState(false)
	const [currentClients, setCurrentClients] = useState<IClient[]>([])
	const [alertDialogOpen, setAlertDialogOpen] = useState(false)
	const [clientToDelete, setClientToDelete] = useState<null | IClient>(null)

	const handleClientSelect = (client: IClient) => {
		navigate(`/dashboard/clients/${client.id}`)
	}

	const handleDeleteClient = async (client: IClient | null) => {
		if (!client) return
		setLoading(true)
		try {
			const response = await axios.delete(`${baseAPIURL}/delete-client/${client.id}`, { withCredentials: true })
			// successfully deleted client send toast
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
		setLoading(false)
	}

	useEffect(() => {
		if (!user?.id) return // Ensure user is available

		setLoading(true)

		const getCurrentClients = async () => {
			try {
				const response = await axios.get(`${baseAPIURL}/list-clients/${user.id}`, {
					withCredentials: true,
				})

				if (response.status === 200) {
					setManagerClients(response.data) // Save the response in the global store
					setCurrentClients(response.data) // Save the response locally if needed
				}
			} catch (e: any) {
				console.log(e)
				toast({
					title: "Internal Server Error",
					description: "Could not fetch current clients. Try again later.",
					variant: "destructive",
				})
			} finally {
				setLoading(false)
			}
		}

		getCurrentClients()
	}, [user])

	const isFundManager = user?.userType === "Fund Manager"
	const totalAssets = assets.reduce((sum: number, asset: Asset) => sum + asset.value, 0)

	return (
		<>
			<div className="flex bg-secondary">
				<Sidebar />
				<AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your client and remove their data from our
								servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => handleDeleteClient(clientToDelete)}
								className="bg-destructive text-destructive-foreground"
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
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
					<Tabs
						defaultValue={user?.userType === "Fund Manager" ? "clients" : "overview"}
						className="mb-6 rounded-md  bg-background p-2"
					>
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							{<TabsTrigger value="clients">Clients</TabsTrigger>}
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
											<TableHead>Last Updated</TableHead>
											<TableHead>Scope</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{loading && (
											<td>
												<LoadingSpinner />
											</td>
										)}
										{managerClients?.length === 0 && !loading ? <div>No current clients.</div> : null}
										{managerClients?.map((client: IClient) => (
											<TableRow key={client.id}>
												<TableCell className="font-bold">{client.company_name}</TableCell>
												<TableCell>9999999999999999</TableCell>
												<TableCell>{client.updated_at}</TableCell>
												<TableCell>
													<Button onClick={() => handleClientSelect(client)}>View Client</Button>
												</TableCell>
												<TableCell>
													<Button
														onClick={() => {
															setClientToDelete(client)
															setAlertDialogOpen(true)
														}}
														className="bg-foreground text-destructive-foreground outline"
													>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TabsContent>
						)}
					</Tabs>
				</div>
			</div>
		</>
	)
}

export default Clients
